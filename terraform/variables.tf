variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "droplet_name" {
  description = "Name of the DigitalOcean Droplet"
  type        = string
}

variable "region" {
  description = "DigitalOcean region (e.g. nyc3, sfo2)"
  type        = string
  default     = "nyc3"
}

variable "size" {
  description = "Droplet size (e.g. s-1vcpu-1gb)"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "image" {
  description = "Droplet image slug (e.g. ubuntu-22-04-x64)"
  type        = string
  default     = "ubuntu-22-04-x64"
}

variable "ssh_public_key" {
  description = "Public SSH key to install on the Droplet"
  type        = string
}