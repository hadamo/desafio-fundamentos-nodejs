import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionService from '../services/GetTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
	try {
		const getTransactions = new GetTransactionService(
			transactionsRepository,
		);
		const transactionBalance = getTransactions.execute();
		return response.json(transactionBalance);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

transactionRouter.post('/', (request, response) => {
	try {
		const { title, value, type } = request.body;
		const createTransaction = new CreateTransactionService(
			transactionsRepository,
		);
		const transaction = createTransaction.execute({ title, value, type });
		return response.json(transaction);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default transactionRouter;
