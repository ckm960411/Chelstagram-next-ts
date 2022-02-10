declare interface PlayerProfile {
  id: number
  backNumber: number
  name: string
  height: string
  weight: string
  mainPosition: mainPosition
  subPosition: subPosition
  detailPosition: detailPosition[]
  profileImg: string
  backgroundImg: string
  birthDate: string
  birthPlace: string
  stats: Stats
  likes: number
  liked: boolean
  comments: PlayerComment[]
}

declare type mainPosition = 'GoalKeeper' | 'Defender' | 'Midfielder' | 'Forward'
declare type subPosition = 'GoalKeeper' | 'CenterBack' | 'SideBack' | 'Defensive Midfielder' | 'Attacking Midfielder' | 'WingForward' | 'Striker'
declare type detailPosition = 'GK' | 'CB' | 'SW' | 'LB' | 'LWB' | 'RB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'CF' | 'ST'

declare interface Stats {
  appearances: number
  assists: number
  chancesCreated: number
  cleanSheets: number
  conversionRate: number
  crosses: number
  gamesStarted: number
  goals: number
  goalsConceded: number
  goalsFromInsideBox: number
  goalsFromOutsideBox: number
  goalsFromSetPieces: number
  goalsScored: number
  minutesPerGoalConceded: number
  minutesPlayed: number
  passAccuracy: number
  passesCompleted: number
  passesTotal: number
  saves: number
  savesPerGame: number
  shootingAccuracy: number
  shotsOnTarget: number
  shotsSaved: number
  shotsTotal: number
  tackleSuccess: number
  tacklesTotal: number
  tacklesWon: number
}

declare interface PlayerComment {
  playerId: number
  id: number
  userId: number
  nickname: string
  profileImg: string | null
  text: string
  createdAt: string
  modifiedAt: string
}
