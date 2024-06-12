import './Message.scss'

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { AvatarProps } from 'tdesign-react'
import { Avatar, Button } from 'tdesign-react'

type NestedPropsGenerator<Prefix extends string, T> = {
  [K in keyof T as `${Prefix}:${K & string}`]?: T[K]
}

export interface IUser {
  name: string
  avatar?: string
}
export type IMessage = {
  text: string
  user?: IUser
  ctime: Date | number | string
  mtime?: Date | number | string
}

interface OnClicks {
  avatar(value: IUser): void
  name(value: IUser): void
}

export type MessageProps = NestedPropsGenerator<'onClick', OnClicks> & {
  value: IMessage
  onChange?(value: IMessage): void
  onDelete?(): void
  textRender?(text: string): React.ReactNode
}

const ClickableAvatar = forwardRef<
  HTMLElement | null,
  AvatarProps & { onClick(event: MouseEvent): void }
>(function ClickableAvatar(props, ref) {
  const avatarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const current = avatarRef.current
    current
      && current.addEventListener('click', props.onClick)
    return () => {
      current
        && current.removeEventListener('click', props.onClick)
    }
  }, [props.onClick])
  useImperativeHandle<
    HTMLElement | null,
    HTMLElement | null
  >(ref, () => avatarRef.current, [])

  return <Avatar ref={avatarRef} {...props} />
})

export function Message(props: MessageProps) {
  const { value, onChange, onDelete, textRender } = props
  const callFunc = <P extends keyof MessageProps & (`onClick:${string}`)>(
    key: P,
    ...args: Parameters<NonNullable<MessageProps[P]>>
  ) => {
    const fn = props[key]
    // @ts-ignore
    if (typeof fn === 'function') fn(...args)
  }
  const { user } = value
  return (
    <div className='message'>
      {user
        ? (
          <>
            <ClickableAvatar
              size='small'
              onClick={() => callFunc('onClick:avatar', user)}
              image={user.avatar}
              content={user.name}
            />
            <div className='message-content'>
              <div className='message-header'>
                <div className='message-name' onClick={() => callFunc('onClick:name', user)}>
                  {user.name}
                </div>
              </div>
              {textRender?.(value.text) ?? value.text}
            </div>
            <div className='message-actions'>
              <Button variant='dashed' shape='square' onClick={() => onChange?.(value)}>
                <span className='shikitor-icon'>edit</span>
              </Button>
              <Button variant='dashed' shape='square' onClick={onDelete}>
                <span className='shikitor-icon'>delete</span>
              </Button>
            </div>
            <div className='message-time'>{new Date(value.ctime).toLocaleString()}</div>
          </>
        )
        : (
          <>
            Not supported message type
          </>
        )}
    </div>
  )
}
