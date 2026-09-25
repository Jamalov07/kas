/** Sotuv / qaytish / to‘lovni bir xil tartibda solishtirish (sana → createdAt → id). */
export type ClientLedgerMoment = {
	id: string
	date: Date
	createdAt: Date
}

function momentTime(d: Date): number {
	return new Date(d).getTime()
}

export function compareClientLedgerMoments(a: ClientLedgerMoment, b: ClientLedgerMoment): number {
	const aDate = momentTime(a.date)
	const bDate = momentTime(b.date)
	if (aDate !== bDate) return aDate - bDate
	const aCreated = momentTime(a.createdAt)
	const bCreated = momentTime(b.createdAt)
	if (aCreated !== bCreated) return aCreated - bCreated
	if (a.id === b.id) return 0
	return a.id < b.id ? -1 : 1
}

/** Shu sotuvning o‘zi emas va undan oldin sodir bo‘lgan amal. */
export function isClientLedgerOpBeforeSelling(op: ClientLedgerMoment, selling: ClientLedgerMoment, sameSelling = false): boolean {
	if (sameSelling) return false
	return compareClientLedgerMoments(op, selling) < 0
}

/** Shu sotuvgacha yoki shu sotuvning o‘zi. */
export function isClientLedgerOpThroughSelling(op: ClientLedgerMoment, selling: ClientLedgerMoment, sameSelling = false): boolean {
	if (sameSelling) return true
	return compareClientLedgerMoments(op, selling) < 0
}
