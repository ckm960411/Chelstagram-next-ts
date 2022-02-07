export interface PlayerProfile {
  playerId: string // id
  backNumber: number
  playerName: string // name
  position: 'GoalKeeper' | 'Defender' | 'Midfielder' | 'Forward'
  // detailPosition: 'ST' | 'CF' | 'CB'  //  
  /** position : {
   *    highGroup: 'asdf' | 'asfd' 
   *    midGroup: 'asdf' | 'asdf'
   *    (lowGroup)
   * } */
  profileImg: string
  backgroundImg: string
  birthDate: string
  birthPlace: string
  stats: Stats
  likes: string[] // number
  comments: PlayerComment[]
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

export interface PlayerComment {
  playerId: string
  commentId: string // id
  userId: string
  userName: string // x
  nickname: string
  profileImg: string | null
  text: string
  date: number // x
  // createdAt: string
  // modifiedAt: string ( 초기값은 createdAt )
  // 2022-02-22 17:00 5분 전 (수정됨)
}