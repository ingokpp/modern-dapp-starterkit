const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', (accounts) => {
	it('...should store the value 69.', async () => {
		const simpleStorageInstance = await SimpleStorage.deployed();

		// Set value of 89
		await simpleStorageInstance.set(69, { from: accounts[0] });

		// Get stored value
		const storedData = await simpleStorageInstance.get.call();

		assert.equal(storedData, 69, 'The value 69 was not stored.');
	});
});
