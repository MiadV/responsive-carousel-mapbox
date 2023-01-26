export const productPaths = [
  {
    id: 1,
    location: {
      title: 'Shan State Myanmar',
      subtitle: 'Shan, Myanmar',
      coordinates: {
        lat: 21.5,
        lng: 98,
      },
    },
    title: 'Origin',
    body: 'The natural tea grows in mixed cultivation in the mountains of the Shan region among macadamia trees and ginger roots.',
    image:
      'https://seedtrace-prd.imgix.net/companies/8902642e-f97c-44fb-9400-228be2c45ded/images/65ac0360-9e1d-4ad7-b3e0-4784316f50b5/ConflictfoodMyanmarteajourney121.jpeg?auto=format&ixlib=react-9.5.2',
  },

  {
    id: 2,
    location: {
      title: 'Shan State Myanmar',
      subtitle: 'Shan, Myanmar',
      coordinates: {
        lat: 20,
        lng: 94,
      },
    },
    title: 'Processing',
    body: 'The tea comes from a controlled organic cultivation. After the tea has been carefully harvested by hand, it is  processed further in the traditional way. The tea can be infused several times and is a delight both hot and cold.',
    image:
      'https://seedtrace-prd.imgix.net/companies/8902642e-f97c-44fb-9400-228be2c45ded/images/92bd3bbf-9f00-4c70-9b91-ead1470a7618/ConflictfoodMyanmarteajourney21.jpeg?auto=format&ixlib=react-9.5.2',
  },
  {
    id: 3,
    location: {
      title: 'Conflictfood',
      subtitle: 'Berling, Germany',
      coordinates: {
        lat: 52.51667,
        lng: 13.38333,
      },
    },
    title: 'Packaging',
    body: 'The organic tea from North Shan is lovingly packaged in Berlin. We enclose our journal "Voices of Myanmar" with each pack, which provides information about the conflict in the multi-ethnic state. You will also learn more about the history, joie de vivre and food culture of Myanmar. This adds up to a small peace package. This is what peace tastes like.',
    image:
      'https://seedtrace-prd.imgix.net/companies/8902642e-f97c-44fb-9400-228be2c45ded/images/573013eb-41a5-48cd-a94c-11b4929af737/Conflictfoodteetasse.jpeg?auto=format&ixlib=react-9.5.2',
  },
];

export type PathType = typeof productPaths[0];
