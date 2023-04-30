# work-instructions-web-app

## How to run the entire application

Ensure that the latest version of the [Docker](https://www.docker.com/products/docker-desktop/) client is installed on your machine.

| :exclamation: WARNING |
| --------------------- |

The `user-fix.bat` and `./dev-fix.sh` scripts in this section will **delete ALL Docker images/containers from your machine**, not just the ones related to this project.

### If you are a user updating from an old version.

If you are using Windows, and you have downloaded a new update of the web app, you must purge the old containers and images from your machine.
Do this by running the included `user-fix.bat` file. If you are not using Windows (i.e. MacOS), you must manually delete all containers and images. You can do this in the docker desktop application.

### If you are a dev and need to add a new node package

From your WSL/Linux Terminal run `./dev-fix.sh`.

#### If you are experiencing a permission issue when running NPM Install

From your WSL/Linux Terminal run `./dev-fix-permission-only.sh`. Then install your package using NPM install, and finally run `./dev-fix.sh`.

### Application run command

Open a command window in the project's root directory. Run the following command:

```bash
docker compose up
```

The frontend will be available at http://localhost:3000/ and the backend at http://localhost:5000/
