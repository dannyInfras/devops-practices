terraform {
  required_version = ">= 1.0.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.28.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

# --------------------------------------------------------------------------------------
# 1) Conditionally create a new SSH Key (only if var.create_ssh_key == true)
# --------------------------------------------------------------------------------------
resource "digitalocean_ssh_key" "deployer" {
  count      = var.create_ssh_key ? 1 : 0
  name       = "${var.droplet_name}-key"
  public_key = var.ssh_public_key
}

# --------------------------------------------------------------------------------------
# 2) If create_ssh_key == false, look up an existing SSH key by name
# --------------------------------------------------------------------------------------
data "digitalocean_ssh_key" "deployer" {
  count = var.create_ssh_key ? 0 : 1
  name  = "${var.droplet_name}-key"
}

# --------------------------------------------------------------------------------------
# 3) Create the Droplet, referencing whichever key (resource or data) is active
# --------------------------------------------------------------------------------------
resource "digitalocean_droplet" "web" {
  name   = var.droplet_name
  region = var.region
  size   = var.size
  image  = var.image

  # Use the newly created key’s fingerprint if count=1, else use the existing key’s fingerprint:
  ssh_keys = [
    var.create_ssh_key 
      ? digitalocean_ssh_key.deployer[0].fingerprint 
      : data.digitalocean_ssh_key.deployer[0].fingerprint
  ]
}

# --------------------------------------------------------------------------------------
# 4) Allocate a Floating IP in the same region and attach it to the Droplet
#    (Terraform will only run this block the very first time, because our CI only calls
#     'terraform apply' if the Droplet did not previously exist.)
# --------------------------------------------------------------------------------------
resource "digitalocean_floating_ip" "ip" {
  droplet_id = digitalocean_droplet.web.id
  region     = var.region
}