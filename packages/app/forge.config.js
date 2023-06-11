module.exports = {
  packagerConfig: {
    asar: true // or an object containing your asar options
  },
  rebuildConfig: {},
  plugins: [
   {
     name: '@electron-forge/plugin-auto-unpack-natives',
     config: {}
   }
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
