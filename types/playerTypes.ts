export interface PlayerProfile {
  playerId: string
  backNumber: number
  playerName: string
  position: 'GoalKeeper' | 'Defender' | 'Midfielder' | 'Forward'
  profileImg: string
  backgroundImg: string
  birthDate: string
  birthPlace: string
  stats: Stats
  likes: string[],
  comments: IComment[]
}

export interface Stats {
  appearances: number
  minutesPlayed: number
  gamesStarted: number
  goals: number
  assists?: number
  crosses?: number
  chancesCreated?: number
  // Forward
  goalsFromInsideBox?: number
  goalsFromOutsideBox?: number
  goalsFromSetPieces?: number
  conversionRate?: number
  totalShots?: number
  shotsOnTarget?: number
  shootingAcuuracy?: number
  // Midfielder
  passAccuracy?: number
  totalPasses?: number
  passesCompleted?: number
  // Defender
  tackleSuccess?: number
  totalTackles?: number
  tacklesWon?: number
  // Goalkeeper
  goalsConceded?: number
  cleanSheets?: number
  minsPerGoalConceded?: number
  shotsSaved?: number
  saves?: number
  savesPerGame?: number
}

export interface IComment {
  playerId: string
  commentId: string
  userId: string
  userName: string
  nickname: string
  profileImg: string | null
  text: string
  date: number
}