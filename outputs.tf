output "container_port" {
  value = docker_container.howmany_container.ports[0].external
}
