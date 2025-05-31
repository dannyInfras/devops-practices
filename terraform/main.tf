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

resource "digitalocean_ssh_key" "deployer" {
  name       = "${var.droplet_name}-key"
  public_key = var.ssh_public_key
}

resource "digitalocean_droplet" "web" {
  name   = var.droplet_name
  region = var.region
  size   = var.size
  image  = var.image

  ssh_keys = [digitalocean_ssh_key.deployer.fingerprint]
}

resource "digitalocean_floating_ip" "ip" {
  droplet_id = digitalocean_droplet.web.id
}