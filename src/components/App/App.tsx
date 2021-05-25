import React, { ReactElement, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import SimpleStorageContract from '../../contracts/SimpleStorage.json';
import getWeb3 from '../../utils/getWeb3';

const App = (): ReactElement => {
	const [storageValue, setStorageValue] = useState<number>();
	const [web3, setWeb3] = useState<Web3>();
	const [accounts, setAccounts] = useState<string[]>();
	const [contract, setContract] = useState<Contract>();

	useEffect(() => {
		const init = async (): Promise<void> => {
			try {
				// Get network provider and web3 instance.
				const web3Obj = await getWeb3();

				// Use web3 to get the user's accounts.
				const accountsObj = await web3Obj.eth.getAccounts();

				// Get the contract instance.
				const networkId = await web3Obj.eth.net.getId();
				const deployedNetwork = (SimpleStorageContract.networks as any)[networkId];
				// const instance = new web3Obj.eth.Contract(SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address);
				const instance = new web3Obj.eth.Contract(
					SimpleStorageContract.abi as AbiItem[],
					deployedNetwork && deployedNetwork.address
				);

				// Set web3, accounts and contract to the state, and then proceed with an example of interacting with the contract's method.
				setWeb3(web3Obj);
				setAccounts(accountsObj);
				setContract(instance);
			} catch (error) {
				alert('Failed to load web3, accounts or contract. Check console for details.');
				console.log(error);
			}
		};
		init();
	}, []);

	useEffect(() => {
		const load = async (): Promise<void> => {
			// Stores a given value, 69 by default.
			await contract?.methods.set(69).send({ from: accounts?.[0] });

			// Get the value from the contract to prove it worked
			const response = await contract?.methods.get().call();

			// Update the state with the result.
			setStorageValue(response);
		};
		if (web3 !== undefined && accounts !== undefined && contract !== undefined) {
			load();
		}
	}, [web3, accounts, contract]);

	if (!web3) {
		return <div>Loading Web3, accounts, and contract...</div>;
	}

	return (
		<div>
			<h1>Good to Go!</h1>
			<h2>Smart Contract Example</h2>
			<p>If your contracts compiled and migrated successfully, below will show a stored value of 69 (by default).</p>
			<div>The stored value is: {storageValue}</div>
		</div>
	);
};

export default App;
