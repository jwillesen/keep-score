const familyToClass = {
  regular: "fa-regular",
  solid: "fa-solid",
  light: "fa-light",
  thin: "fa-thin",
  duotone: "fa-duotone",
  brand: "fa-brands",
}

interface Props {
  name: string
  family?: keyof typeof familyToClass
}

export default function Icon({ name, family = "regular" }: Props) {
  const classes = `${familyToClass[family]} fa-${name}`
  return <i aria-hidden className={classes} />
}
