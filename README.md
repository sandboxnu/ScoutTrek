# ScoutTrek

Plan Scouting events in 3 minutes.

Girl Scouts             |  Boy Scouts
:-------------------------:|:-------------------------:
![Girl Scout Meeting](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_300/v1647448233/ScoutTrek/pauline-loroy-A9U0cMNsxwY-unsplash.jpg)  |  ![Slip and slide](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_450/v1599241295/ScoutTrek/luke-porter-mGFJIUD9yiM-unsplash.jpg)

One central location for Patrol Leaders and Scoutmasters to plan events:

Choose Event | Fill out Details | Notify the Troop
:-------------------------:|:-------------------------:|:-------------------------:
![Choose Event](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_325/v1647456135/ScoutTrek/Screen_Shot_2022-03-16_at_14.36.34.png)  |  ![Fill out Details](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_325/v1647456135/ScoutTrek/Screen_Shot_2022-03-16_at_14.37.04.png) | ![Notify the Troop](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_325/v1647456135/ScoutTrek/Screen_Shot_2022-03-16_at_14.40.58.png)

Replace confusing email chains with one simple event planner

Calendar | Upcoming Events
:-------------------------:|:-------------------------:
![Calendar](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_325/v1647461045/ScoutTrek/Screen_Shot_2022-03-16_at_16.03.09.png) | ![Choose Event](https://res.cloudinary.com/wow-your-client/image/upload/c_scale,w_325/v1647461045/ScoutTrek/Screen_Shot_2022-03-16_at_15.35.34.png)

## Related

The API for ScoutTrek can be found at

[ScoutTrek API](https://github.com/TheEarlyNerd/ScoutTrek-API)

The Custom Figma Design System can be found at

[Figma File](https://www.figma.com/community/file/1086027778775525073)

## Tech stack

* TypeScript
* React Native + Expo
* React Navigation
* Apollo Client

## Installation

This project uses [Expo](https://docs.expo.dev/get-started/installation/)

To download this project

```bash
  git clone git@github.com:TheEarlyNerd/ScoutTrek.git
```

then to run on an Expo simulator: 

```bash
  yarn install
```

Place your local IP address into the local variable in the .env file, as seen below:

`LOCAL_IP_ADDRESS={your ip address here}`

To find it, run `ipconfig` in a terminal (`ipconfig getifaddr en0` for Mac) and take the IPv4 Address underneath Wireless LAN adapter Wi-Fi. Alternatively,
you can go to your Network and Internet Settings >> Properties >> scroll until you see IPv4 Address for Windows, or for Mac,
System Preferences >> Network >> the wifi network you're connected to.

Note that your IP address will change if you're on different wifi networks, so you will need to do this each time you develop. Then run

```bash
  yarn start --clear
```

Note that the `--clear` might not be necessary (especially if you've been developing on the same wifi network), but will help if you have some React Native caching issues.

If you are on public wifi, you may need to run 

```bash
  yarn start --tunnel --clear
```

You may also need to run the following commands if you get errors related to them:

```bash
  yarn add babel-plugin-transform-inline-environment-variables
  yarn add apollo-upload-client
```

If you are having issues related to Android SDK path, you may also need to install Android Studio / have some Android development files set up. (Doing so will also let you use Android emulators.)

To run on an iOS device

```bash
  yarn install
  cd ios && pod install && cd ..
```

Then open the project in XCode

## License

Content and Design Copyright &copy; ScoutTrek LLC. All rights reserved.
