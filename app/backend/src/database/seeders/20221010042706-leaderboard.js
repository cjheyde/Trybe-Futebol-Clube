module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'leaderboards',
      [
        {
          name: 'Avaí/Kindermann',
        },
        {
          name: 'Bahia',
        },
        {
          name: 'Botafogo',
        },
        {
          name: 'Corinthians',
        },
        {
          name: 'Cruzeiro',
        },
        {
          name: 'Ferroviária',
        },
        {
          name: 'Flamengo',
        },
        {
          name: 'Grêmio',
        },
        {
          name: 'Internacional',
        },
        {
          name: 'Minas Brasília',
        },
        {
          name: 'Napoli-SC',
        },
        {
          name: 'Palmeiras',
        },
        {
          name: 'Real Brasília',
        },
        {
          name: 'Santos',
        },
        {
          name: 'São José-SP',
        },
        {
          name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('leaderboards', null, {});
  },
};
