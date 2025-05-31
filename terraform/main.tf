terraform {
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

# Upload the SSH Key
resource "digitalocean_ssh_key" "deployer" {
  name       = "${var.droplet_name}-key"
  public_key = var.ssh_public_key
}

# Create the Droplet
resource "digitalocean_droplet" "web" {
  name   = var.droplet_name
  region = var.region
  size   = var.size
  image  = var.image

  ssh_keys = [digitalocean_ssh_key.deployer.fingerprint]
}

# Associate a Floating IP so that the IP remains stable across re-creations
resource "digitalocean_floating_ip" "ip" {
  droplet_id = digitalocean_droplet.web.id
}

output "droplet_ip" {
  description = "The public IPv4 address of the Droplet (Floating IP)"
  value       = digitalocean_floating_ip.ip.ip_address
}