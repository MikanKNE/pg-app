# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # nixpkgs channel
  channel = "stable-24.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.jdk21
    pkgs.python312
    pkgs.go_1_24
    pkgs.rustc
    pkgs.cargo
    pkgs.gcc
    pkgs.nodejs_22
    pkgs.docker
    pkgs.docker-compose
    pkgs.firebase-tools
    pkgs.gh
  ];

  # Docker service enable
  services.docker.enable = true;

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "redhat.java"
      "vscjava.vscode-java-pack"
      "vmware.vscode-spring-boot"
      "vmware.vscode-boot-dev-pack"
      "ms-python.python"
      "ms-python.vscode-pylance"
      "golang.go"
      "rust-lang.rust-analyzer"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "ms-azuretools.vscode-docker"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
