export interface PlayerProfile {
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
  likes: string[] // number
  // liked: boolean
  comments: PlayerComment[]
}

type mainPosition = 'GoalKeeper' | 'Defender' | 'Midfielder' | 'Forward'
type subPosition = 'GoalKeeper' | 'CenterBack' | 'SideBack' | 'Defensive Midfielder' | 'Attacking Midfielder' | 'WingForward' | 'Striker'
type detailPosition = 'GK' | 'CB' | 'SW' | 'LB' | 'LWB' | 'RB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'CF' | 'ST'

export interface Stats {
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

export interface PlayerComment {
  playerId: number
  id: number
  userId: string
  nickname: string
  profileImg: string | null
  text: string
  createdAt: string
  modifiedAt: string
}

export class PlayerClass {
  stats: Stats = {
    appearances: 0,
    assists: 0,
    chancesCreated: 0,
    cleanSheets: 0,
    conversionRate: 0,
    crosses: 0,
    gamesStarted: 0,
    goals: 0,
    goalsConceded: 0,
    goalsFromInsideBox: 0,
    goalsFromOutsideBox: 0,
    goalsFromSetPieces: 0,
    goalsScored: 0,
    minutesPerGoalConceded: 0,
    minutesPlayed: 0,
    passAccuracy: 0,
    passesCompleted: 0,
    passesTotal: 0,
    saves: 0,
    savesPerGame: 0,
    shootingAccuracy: 0,
    shotsOnTarget: 0,
    shotsSaved: 0,
    shotsTotal: 0,
    tackleSuccess: 0,
    tacklesTotal: 0,
    tacklesWon: 0,
  }
  constructor(
    public id: number,
    public backNumber: number,
    public name: string,
    public mainPosition: mainPosition,
    public subPosition: subPosition,
    public detailPosition: detailPosition[],
    public height: string,
    public weight: string,
    public profileImg: string,
    public backgroundImg: string,
    public birthDate: string,
    public birthPlace: string,
    public likes: number,
    public liked: boolean,
    public comments: PlayerComment[],
  ) {}
}