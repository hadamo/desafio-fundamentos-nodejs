import TransactionsRepository, {
	Balance,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
	transactions: Transaction[];
	balance: Balance;
}
class GetTransactionService {
	private transactionsRepository: TransactionsRepository;

	constructor(transactionsRepository: TransactionsRepository) {
		this.transactionsRepository = transactionsRepository;
	}

	public execute(): Request {
		const transactions = this.transactionsRepository.all();
		const balance = this.transactionsRepository.getBalance();
		const request = {
			transactions,
			balance,
		};

		return request;
	}
}

export default GetTransactionService;
