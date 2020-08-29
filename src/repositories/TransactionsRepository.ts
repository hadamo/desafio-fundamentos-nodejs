import Transaction from '../models/Transaction';

export interface Balance {
	income: number;
	outcome: number;
	total: number;
}

interface CreateTransactionTDO {
	title: string;
	value: number;
	type: 'income' | 'outcome';
}

class TransactionsRepository {
	private transactions: Transaction[];

	constructor() {
		this.transactions = [];
	}

	public all(): Transaction[] {
		return this.transactions;
	}

	public getBalance(): Balance {
		let income = 0;
		let outcome = 0;

		if (this.transactions.length > 0) {
			const incomeTransactions = this.transactions.map(transaction =>
				transaction.type === 'income' ? transaction.value : 0,
			);

			income = incomeTransactions.reduce(
				(value, newIncome) => newIncome + value,
			);

			const outcomeTransactions = this.transactions.map(transaction =>
				transaction.type === 'outcome' ? transaction.value : 0,
			);

			outcome = outcomeTransactions.reduce(
				(value, newOutcome) => newOutcome + value,
			);
		}

		const total: number = income - outcome;

		const balance: Balance = {
			income,
			outcome,
			total,
		};
		return balance;
	}

	public create({ title, type, value }: CreateTransactionTDO): Transaction {
		const transaction = new Transaction({ title, type, value });

		this.transactions.push(transaction);

		return transaction;
	}
}

export default TransactionsRepository;
