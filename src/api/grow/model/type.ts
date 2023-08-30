export interface FlowerVO {
  bmhSeed: number
  bmhSprout: number
  bmhBloom: number
  bmhFruit: number
  xcjSeed: number
  xcjSprout: number
  xcjBloom: number
  xcjFruit: number
  xhhSeed: number
  xhhSprout: number
  xhhBloom: number
  xhhFruit: number
}

export interface FlowerForm {
  key: keyof FlowerVO
  value: number
}
