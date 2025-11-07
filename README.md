# How Long Until...

This project deploys a Docker container running a simple web application that counts down to a user-specified date.

## Features

*   Countdown timer for a selected date.
*   Responsive design.
*   Deployed using Terraform and Docker.

## Technologies Used

*   HTML
*   CSS
*   JavaScript
*   Docker
*   Terraform

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Docker:** Used for containerizing the web application.
    *   [Install Docker](https://docs.docker.com/get-docker/)
*   **Terraform:** Used for defining and provisioning the infrastructure (Docker image and container).
    *   [Install Terraform](https://developer.hashicorp.com/terraform/downloads)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ezotic/how-long-until.git
    cd how-long-until
    ```

2.  **Initialize Terraform:**
    ```bash
    terraform init
    ```

3.  **Apply the Terraform configuration to deploy the application:**
    ```bash
    terraform apply -auto-approve
    ```

## Usage

Once deployed, access the application in your web browser at `http://localhost:8080`.

1.  Select a target date using the calendar input.
2.  The countdown timer will display the remaining days, hours, minutes, and seconds until the selected date.

## Destroying the Infrastructure

To remove all deployed resources, run the following command:

```bash
terraform destroy -auto-approve
```
