terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.22.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "howmany" {
  name         = "howmany"
  build {
    path = "."
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "howmany_container" {
  image = docker_image.howmany.name
  name  = "howmany_container"
  ports {
    internal = 80
    external = 8080
  }
}
