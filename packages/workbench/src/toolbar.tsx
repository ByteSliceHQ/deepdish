'use client'

import { useWorkbench } from './context'
import { stylesheet } from './stylesheet'
import { Button } from './ui/button'

const wrapper = stylesheet.style({
  border: `1px solid ${stylesheet.var('slate600')}`,
  borderRadius: '4px',
  position: 'fixed',
  bottom: '50vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  left: '12px',
  background: '#282C34',
  padding: '6px 6px',
  zIndex: 999,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
})

const group = stylesheet.style({
  fontSize: stylesheet.var('fontSizeSm'),
  color: stylesheet.var('slate600'),
  fontWeight: 'bold',
  display: 'block',
  alignItems: 'center',
  gap: '10px',
})

export function Toolbar() {
  const workbench = useWorkbench()

  return (
    <div className={wrapper}>
      <div className={group}>
        <div>
          <svg
            fill="#FFF"
            height="52px"
            width="24px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-22.45 -22.45 269.41 269.41"
            stroke="#FFF"
            strokeWidth="3.816704"
            transform="matrix(1, 0, 0, 1, 0, 0)rotate(180)"
          >
            <title>DeepDish</title>
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#EF4444"
              strokeWidth="44.9024"
            >
              <g>
                <circle cx="89" cy="74.426" r="14.146" />
                <path d="M112.256,126.77c-7.811,0-14.145,6.334-14.145,14.147c0,7.816,6.334,14.15,14.145,14.15c7.814,0,14.148-6.334,14.148-14.15 C126.404,133.104,120.07,126.77,112.256,126.77z" />
                <circle cx="133.563" cy="93.729" r="14.146" />
                <path d="M195.287,16.574C168.741,5.576,140.776,0,112.169,0c-28.493,0-56.4,5.574-82.945,16.566 c-1.838,0.762-3.298,2.223-4.06,4.061c-0.761,1.838-0.761,3.904,0.001,5.742l11.992,28.932c0.001,0.004,0.005,0.008,0.007,0.012 l68.16,164.574c1.168,2.818,3.917,4.625,6.926,4.625c0.218,0,0.437-0.01,0.656-0.029c2.85-0.248,5.271-2.088,6.311-4.682 l68.143-164.49c0.002-0.004,0.004-0.006,0.006-0.01l11.98-28.928C200.93,22.545,199.113,18.158,195.287,16.574z M112.169,15 c24.133,0,47.778,4.264,70.397,12.688l-6.246,15.08c-20.618-7.598-42.157-11.445-64.138-11.445 c-21.896,0-43.382,3.848-63.982,11.443L41.946,27.68C64.554,19.262,88.141,15,112.169,15z M112.254,197.416L53.949,56.643 c18.766-6.846,38.317-10.32,58.232-10.32c20,0,39.605,3.477,58.389,10.324L112.254,197.416z" />
              </g>
            </g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <circle cx="89" cy="74.426" r="14.146" />
                <path d="M112.256,126.77c-7.811,0-14.145,6.334-14.145,14.147c0,7.816,6.334,14.15,14.145,14.15c7.814,0,14.148-6.334,14.148-14.15 C126.404,133.104,120.07,126.77,112.256,126.77z" />
                <circle cx="133.563" cy="93.729" r="14.146" />
                <path d="M195.287,16.574C168.741,5.576,140.776,0,112.169,0c-28.493,0-56.4,5.574-82.945,16.566 c-1.838,0.762-3.298,2.223-4.06,4.061c-0.761,1.838-0.761,3.904,0.001,5.742l11.992,28.932c0.001,0.004,0.005,0.008,0.007,0.012 l68.16,164.574c1.168,2.818,3.917,4.625,6.926,4.625c0.218,0,0.437-0.01,0.656-0.029c2.85-0.248,5.271-2.088,6.311-4.682 l68.143-164.49c0.002-0.004,0.004-0.006,0.006-0.01l11.98-28.928C200.93,22.545,199.113,18.158,195.287,16.574z M112.169,15 c24.133,0,47.778,4.264,70.397,12.688l-6.246,15.08c-20.618-7.598-42.157-11.445-64.138-11.445 c-21.896,0-43.382,3.848-63.982,11.443L41.946,27.68C64.554,19.262,88.141,15,112.169,15z M112.254,197.416L53.949,56.643 c18.766-6.846,38.317-10.32,58.232-10.32c20,0,39.605,3.477,58.389,10.324L112.254,197.416z" />
              </g>
            </g>
          </svg>
        </div>
        <Button
          onClick={
            workbench.authenticated ? workbench.onSignOut : workbench.onSignIn
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height="24px"
            width="24px"
          >
            <title>Sign Out</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
