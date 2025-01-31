'use client'

import { useActions, useMode } from '@deepdish/core'
import { useWorkbench } from './context'
import { stylesheet } from './stylesheet'
import { Button } from './ui/button'

const toolbar = stylesheet.style({
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  border: '1px solid #1C1C1E',
  borderRadius: '9999px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 9999,
})

const toolbarDivider = stylesheet.style({
  height: '16px',
  width: '1px',
  backgroundColor: '#e0e0e0',
  margin: '0 8px',
})

const toolbarIcon = stylesheet.style({
  width: '16px',
  height: '16px',
  marginRight: '4px',
})

export function Toolbar() {
  const workbench = useWorkbench()
  const actions = useActions()
  const mode = useMode()

  return (
    <div className={toolbar}>
      <Button>
        <svg
          className={toolbarIcon}
          viewBox="0 0 857 890"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M350.647 399.296C371.087 387.495 378.091 361.357 366.289 340.917C354.488 320.476 328.351 313.473 307.91 325.274C287.47 337.076 280.467 363.213 292.268 383.653C304.069 404.094 330.206 411.097 350.647 399.296Z"
            fill="black"
          />
          <path
            d="M469.192 464.106C448.756 475.905 441.752 502.044 453.554 522.486C465.36 542.935 491.5 549.939 511.936 538.14C532.38 526.337 539.384 500.197 527.578 479.748C515.776 459.306 489.636 452.302 469.192 464.106Z"
            fill="black"
          />
          <path
            d="M496.397 382.485C516.837 370.683 523.841 344.546 512.039 324.106C500.238 303.665 474.101 296.662 453.66 308.463C433.22 320.264 426.217 346.402 438.018 366.842C449.819 387.283 475.956 394.286 496.397 382.485Z"
            fill="black"
          />
          <path
            d="M519.974 50.3731C433.907 61.6975 352.318 89.3512 277.473 132.563C202.925 175.603 138.331 232.342 85.4837 301.198C81.8259 305.968 80.2129 311.996 80.9957 317.956C81.781 323.914 76.2255 428.409 80.9956 432.067L116.187 457.078L148.828 480.394L575.901 768.236C575.901 768.236 618.493 719.842 616.82 719.842C617.391 719.512 617.949 719.155 618.493 718.775C625.575 713.821 629.13 705.35 627.932 696.992L557.748 163.697C557.747 163.683 557.749 163.675 557.748 163.661L545.395 69.8793C543.757 57.4713 532.376 48.738 519.974 50.3731ZM300.131 171.809C363.271 135.355 431.575 110.794 503.479 98.6668L509.917 147.556C444.496 158.822 382.331 181.292 324.821 214.496C267.534 247.57 217.132 290.094 174.708 341.082L135.557 311.059C181.992 254.884 237.265 208.104 300.131 171.809ZM575.901 648.943L210.711 368.705C249.468 322.447 295.373 283.825 347.477 253.742C399.804 223.531 456.35 203.014 515.838 192.554L575.901 648.943Z"
            fill="black"
          />
        </svg>
      </Button>
      <div className={toolbarDivider} aria-hidden="true" />
      <Button onClick={actions.toggleMode}>
        <svg
          className={toolbarIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        {mode === 'edit' ? 'Editing' : 'Viewing'}
      </Button>
      <div className={toolbarDivider} aria-hidden="true" />
      {workbench.authenticated ? (
        <Button onClick={workbench.onSignOut}>
          <svg
            className={toolbarIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </Button>
      ) : (
        <Button onClick={workbench.onSignIn}>
          <svg
            className={toolbarIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Login
        </Button>
      )}
    </div>
  )
}
