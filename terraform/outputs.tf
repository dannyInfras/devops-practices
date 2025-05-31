output "droplet_ip" {
  description = "Public IP address of the newly‐created Droplet"
  value       = digitalocean_floating_ip.ip.ip_address
}