variable "do_token" {
  description = "DigitalOcean API token (must have Read+Write on Droplets, SSH Keys, Floating IPs)"
  type        = string
  sensitive   = true
}

variable "droplet_name" {
  description = "Name of the DigitalOcean Droplet (also used as the SSH‐Key name)"
  type        = string
}

variable "region" {
  description = "DigitalOcean region (e.g. nyc3, sfo2, etc.)"
  type        = string
  default     = "nyc3"
}

variable "size" {
  description = "Droplet size (e.g. s-1vcpu-1gb)"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "image" {
  description = "Droplet base image slug (e.g. ubuntu-22-04-x64)"
  type        = string
  default     = "ubuntu-22-04-x64"
}

variable "ssh_public_key" {
  description = "The public SSH key (in OpenSSH format) to use for root access"
  type        = string
}

variable "create_ssh_key" {
  description = "Whether to create a new SSH Key (true) or use an existing one (false)."
  type        = bool
  default     = true
}