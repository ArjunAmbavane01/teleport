import { Boundary } from "../Boundary"
import { Sprite } from "../Sprite"

export const rectangularCollision = (sprite: Sprite, boundary: Boundary) => {
    return (
        (sprite.posX + sprite.width >= boundary.posX) &&
        (sprite.posX <= boundary.posX + Boundary.width) &&
        (sprite.posY + sprite.height/2 <= boundary.posY + Boundary.height) &&
        (sprite.posY + sprite.height >= boundary.posY)
    )
}