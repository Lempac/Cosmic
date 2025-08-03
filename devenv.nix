{ pkgs, ... }:

{
  languages.nix.enable = true;
  languages.deno.enable = true;
  packages = with pkgs; [nixd nil];
}
