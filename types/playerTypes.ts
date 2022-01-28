export interface PlayerProfile {
  playerId: string
  backNumber: number
  userName: string
  position: 'GoalKeeper' | 'Defender' | 'Midfielder' | 'Forward'
  profileImg: string
  backgroundImg: string
  birthDate: string
  birthPlace: string
  stats: Stats
  comments: Comment[]
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

export interface Comment {
  commentId?: string
  userId?: string
  userName?: string
  nickname?: string
  profileImg?: string | null
  text?: string
  date?: number
}