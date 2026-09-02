# Prior-use review — slops-native-sim-drive

No runs yet, and none possible until a macOS build host exists. `draft`.

| Date | Flow | Devices | Flake + cause | Tool versions | Simulator vs. device disagreement |
|---|---|---|---|---|---|

## Blocking decision

A macOS build host. Local Xcode was found not viable on a 2017 Intel MacBook Air.
Options are a cloud macOS runner or newer hardware; this is a founder decision and it
blocks both this skill and the native ESPN path. **Do not mark this skill `active`
until a host exists and the smoke test has passed on it.**

## Authoring notes

- Maestro is optional on purpose. It is the nicest ergonomics, but it is another
  dependency and another version to pin; the raw simctl/adb path works without it.
  Decide after the first real flow whether the ergonomics are worth it.
- The device matrix deliberately mirrors `mobile-first-qa-playbook` so native and web
  findings stay comparable while both exist.
- Screenshot naming is ordered (`NN-step`) so a directory listing reads as the flow.
