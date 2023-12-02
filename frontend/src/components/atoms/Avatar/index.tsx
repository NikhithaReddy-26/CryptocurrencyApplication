import React from 'react'
import avatar from '../../../../public/assets/images/Avatar.svg'

interface Props {
  alt: string
}

const MyAvatar: React.FC<Props> = ({ alt }) => {
  return <img alt={alt} src={avatar} />
}

export default MyAvatar
