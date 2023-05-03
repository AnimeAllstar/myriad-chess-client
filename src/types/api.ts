// Outcome reason
export enum Reason {
  CHECKMATE = 1,
  STALEMATE = 2,
  INSUFFICIENT_MATERIAL = 3,
  SEVENTYFIVE_MOVES = 4,
  FIVEFOLD_REPETITION = 5,
  FIFTY_MOVES = 6,
  THREEFOLD_REPETITION = 7,
  VARIANT_WIN = 8,
  VARIANT_LOSS = 9,
  VARIANT_DRAW = 10
}

// Outcome Reason as a string
export const ReasonString: { [key in Reason]: string } = {
  [Reason.CHECKMATE]: 'CHECKMATE',
  [Reason.STALEMATE]: 'STALEMATE',
  [Reason.INSUFFICIENT_MATERIAL]: 'INSUFFICIENT_MATERIAL',
  [Reason.SEVENTYFIVE_MOVES]: 'SEVENTYFIVE_MOVES',
  [Reason.FIVEFOLD_REPETITION]: 'FIVEFOLD_REPETITION',
  [Reason.FIFTY_MOVES]: 'FIFTY_MOVES',
  [Reason.THREEFOLD_REPETITION]: 'THREEFOLD_REPETITION',
  [Reason.VARIANT_WIN]: 'VARIANT_WIN',
  [Reason.VARIANT_LOSS]: 'VARIANT_LOSS',
  [Reason.VARIANT_DRAW]: 'VARIANT_DRAW'
} as const

// Outcome winner
export type Winner = {
  WHITE: true
  BLACK: false
  DRAW: null
}

// Game outcome
export interface Outcome {
  termination: Reason
  winner: Winner
}

// API response
export type ApiResponse = {
  fen: string
  move?: string
  outcome?: Outcome
}
