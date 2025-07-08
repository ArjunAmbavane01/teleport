export const rectangularCollision = (sprite: Sprite, boundary: Boundary) => {
    return (
        (sprite.posX + sprite.width >= boundary.posX) &&
        (sprite.posX <= boundary.posX + Boundary.width) &&
        (sprite.posY <= boundary.posY + Boundary.height) &&
        (sprite.posY + sprite.height >= boundary.posY)
    )
}