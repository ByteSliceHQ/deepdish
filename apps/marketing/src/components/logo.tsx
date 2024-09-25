'use client'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      aria-label="DeepDish"
      width="32"
      height="32"
      viewBox="0 0 497 522"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.9511 0.668612C85.9511 0.994612 85.0501 2.40661 83.9491 3.80661C82.8471 5.20661 80.9721 9.3276 79.7821 12.9646C77.9041 18.6996 77.5401 22.6946 77.0341 43.0766L76.4511 66.5766L73.7011 66.8926L70.9511 67.2096L70.9661 44.8926C70.9841 18.1066 72.6731 8.7306 78.7271 1.8266C80.1321 0.223601 85.9511 -0.709388 85.9511 0.668612ZM119.212 6.08661C138.568 12.4276 142.291 12.8306 175.451 12.1636C200.477 11.6596 213.199 15.1806 246.451 31.8146C273.289 45.2406 279.424 47.1996 307.97 51.4646C331.567 54.9896 334.442 56.2276 345.451 67.6086C350.401 72.7256 355.382 77.3706 356.52 77.9326C357.657 78.4936 364.857 80.4926 372.52 82.3736C400.002 89.1236 408.799 94.6506 420.951 112.805C433.062 130.899 440.09 136.981 454.296 141.665C464.498 145.028 468.925 147.237 473.482 151.238C477.37 154.652 476.871 156.033 471.739 156.062C461.507 156.119 447.059 167.469 440.17 180.858C437.986 185.104 435.413 191.052 434.452 194.077C433.491 197.102 432.328 199.987 431.866 200.489C430.8 201.648 412.136 189.465 396.967 177.707C324.481 121.526 227.604 84.6376 114.451 70.1316C105.651 69.0036 96.5041 68.0796 94.1241 68.0786L89.7971 68.0766L90.1401 43.3266C90.5131 16.3636 90.9791 13.8546 96.7541 7.70459C99.1491 5.15459 104.109 2.2236 106.212 2.1156C106.631 2.0946 112.481 3.88061 119.212 6.08661ZM74.6911 80.7046C76.3521 81.1496 76.8091 81.8576 76.4581 83.4406C76.1971 84.6156 72.3941 102.002 68.0061 122.077C52.2761 194.042 35.8821 268.605 17.7671 350.577C7.21508 398.329 6.77906 400.755 8.08406 404.544C8.94806 407.05 10.7401 409.385 12.9511 410.883C20.2321 415.815 20.2981 415.79 94.4511 380.105C158.489 349.287 201.021 328.918 247.951 306.593C289.797 286.686 375.722 245.758 395.451 236.336C406.451 231.082 419.168 225.068 423.711 222.971C440.016 215.447 442.792 212.277 447.807 195.457C453.901 175.016 471.758 163.264 486.53 169.973C495.318 173.965 497.294 179.494 496.77 198.633L496.388 212.577L481.178 258.083C472.095 285.255 464.907 305.15 463.334 307.463C460.892 311.057 453.566 314.88 362.076 360.297C307.832 387.225 263.309 409.641 263.136 410.111C262.963 410.58 261.495 412.635 259.872 414.676C251.447 425.277 240.793 428.023 233.123 421.568L230.141 419.059L229.58 423.818C229.271 426.435 228.726 440.361 228.368 454.765C227.693 481.995 227.508 482.996 223.451 481.439C222.187 480.954 221.951 477.736 221.951 461.018V441.172L219.354 443.579C217.926 444.902 214.813 446.728 212.436 447.636C207.21 449.632 202.661 448.517 197.487 443.974L194.194 441.084L121.823 476.944C31.2671 521.815 30.5021 522.153 22.7801 520.705C18.0531 519.818 11.6521 515.094 8.28508 510.006C5.92608 506.441 5.48407 504.496 4.81807 494.748C4.39907 488.604 3.98807 474.802 3.90407 464.077C3.76807 446.423 3.95407 444.046 5.87307 438.963C7.03907 435.875 8.84507 432.578 9.88707 431.635C11.7261 429.971 11.6401 429.783 6.96608 425.249C-0.774918 417.738 -1.70193 410.842 2.39907 391.263C4.79507 379.821 11.5451 349.017 37.9371 229.077C45.1381 196.352 55.3071 150.002 60.5371 126.077C65.7661 102.152 70.2341 82.0146 70.4661 81.3266C70.9401 79.9246 71.4831 79.8446 74.6911 80.7046ZM107.951 82.1056C144.34 85.6196 193.477 95.7526 231.451 107.574C299.976 128.904 354.403 157.931 403.847 199.516C408.465 203.399 413.394 207.53 414.801 208.696L417.359 210.814L413.905 212.628C404.483 217.573 367.8 235.175 287.951 273.065C266.226 283.374 237.538 297.044 224.201 303.443C210.864 309.842 189.038 320.307 175.701 326.698C137.808 344.858 83.1311 371.067 52.5381 385.737C37.1861 393.098 23.5511 399.39 22.2391 399.72C20.1391 400.247 19.9151 400.034 20.3781 397.948C20.6661 396.644 22.9681 386.127 25.4921 374.577C28.0161 363.027 38.4031 315.777 48.5751 269.577C58.7461 223.377 70.1681 171.402 73.9561 154.077C83.0121 112.665 89.9841 81.8326 90.4711 81.0436C90.6871 80.6956 92.1201 80.5416 93.6571 80.7026C95.1941 80.8636 101.626 81.4946 107.951 82.1056ZM94.9251 87.8266C94.9101 88.2396 93.5871 94.4156 91.9841 101.553C90.3811 108.689 89.2111 114.67 89.3841 114.843C89.5571 115.017 91.2181 114.269 93.0751 113.182C94.9321 112.095 100.051 109.974 104.451 108.469C111.34 106.113 114.118 105.722 124.451 105.655C131.524 105.609 138.709 106.138 141.951 106.944C154.65 110.102 164.843 117.025 169.113 125.394L171.124 129.337L178.733 128.648C185.103 128.07 189.28 126.715 204.396 120.318C214.326 116.116 222.638 112.543 222.868 112.378C223.844 111.673 221.453 110.888 205.389 106.636C177.078 99.1436 144.105 92.8176 114.008 89.1046C95.5051 86.8226 94.9611 86.7856 94.9251 87.8266ZM185.369 107.684C187.57 108.528 187.351 112.792 185.044 114.027C183.595 114.802 182.601 114.614 180.911 113.245C179.017 111.712 178.859 111.117 179.853 109.26C181.045 107.033 182.551 106.603 185.369 107.684ZM109.733 113.63C102.478 115.389 93.0621 120.12 89.2701 123.911C86.3731 126.809 83.9511 132.76 83.9511 136.983C83.9511 140.222 87.4571 146.483 90.8851 149.368C98.3461 155.646 109.855 159.077 123.451 159.077C133.783 159.077 140.494 157.716 148.951 153.907C159.536 149.139 164.951 142.767 164.951 135.077C164.951 125.48 156.134 117.511 141.247 113.654C133.768 111.716 117.678 111.704 109.733 113.63ZM231.951 115.798C231.126 116.108 221.146 120.33 209.772 125.179C192.568 132.515 187.699 134.172 180.798 135.037C176.236 135.609 172.154 136.077 171.727 136.077C171.3 136.077 170.951 137.207 170.951 138.588C170.951 142.519 167.094 149.744 163.144 153.213C154.55 160.758 139.521 165.432 123.951 165.401C107.263 165.368 94.7771 161.432 85.8891 153.402C83.6941 151.419 81.7461 149.972 81.5591 150.187C81.3731 150.401 79.3261 159.352 77.0101 170.077C74.6951 180.802 72.6091 190.271 72.3741 191.119C72.0381 192.335 73.6881 192.989 80.2001 194.22C84.7381 195.077 91.0571 197.012 94.2421 198.52C101.203 201.815 93.8821 204.427 151.451 178.11C175.651 167.048 211.07 150.927 230.161 142.287C249.251 133.646 264.888 126.339 264.911 126.049C264.95 125.529 234.925 114.947 233.951 115.137C233.676 115.191 232.776 115.488 231.951 115.798ZM271.451 130.687C234.494 147.657 112.745 203.124 109.041 204.678L105.632 206.108L107.744 208.356C108.905 209.593 110.89 212.9 112.153 215.705L114.451 220.806L142.451 208.845C216.497 177.217 279.547 150.364 289.874 146.058L301.298 141.295L297.374 139.299C293.937 137.55 287.879 134.891 277.451 130.556C275.008 129.541 273.894 129.565 271.451 130.687ZM142.381 131.755C143.79 135.427 140.793 136.297 123.818 137.144C107.404 137.962 104.951 137.62 104.951 134.514C104.951 132.241 107.163 131.594 116.951 131.005C136.988 129.799 141.684 129.938 142.381 131.755ZM278.632 157.969C262.232 165.001 248.945 171.165 249.107 171.666C249.268 172.167 253.326 174.897 258.124 177.732L266.848 182.887L296.477 169.982C312.773 162.884 326.495 157.077 326.97 157.077C327.445 157.077 328.09 156.661 328.405 156.152C328.946 155.277 311.186 145.017 309.327 145.131C308.845 145.16 295.033 150.938 278.632 157.969ZM310.451 171.089C296.701 177.116 283.089 183.006 280.201 184.178C277.313 185.35 274.954 186.595 274.957 186.943C274.96 187.292 278.629 189.765 283.11 192.439C290.847 197.056 291.446 197.245 294.971 196.189C297.012 195.578 299.497 195.077 300.492 195.077C301.487 195.077 308.3 198.677 315.633 203.077C322.965 207.477 329.349 211.077 329.82 211.077C330.29 211.077 334.515 209.277 339.21 207.077C348.84 202.564 350.461 202.292 351.884 204.951C352.642 206.367 352.467 207.199 351.169 208.355C348.81 210.456 331.636 218.077 329.26 218.077C328.2 218.077 321.509 214.454 314.392 210.026C300.888 201.625 301.383 201.773 292.951 203.607C291.074 204.015 287.494 202.428 278.578 197.233L266.706 190.316L254.328 195.402C247.521 198.199 241.952 200.733 241.954 201.032C241.956 201.332 253.094 208.763 266.704 217.546C280.315 226.329 297.49 237.499 304.87 242.369L318.289 251.224L327.87 246.748C346.369 238.106 405.445 209.917 405.799 209.562C405.997 209.365 400.277 204.562 393.088 198.89L380.019 188.577H350.735H321.451V186.077C321.451 183.619 321.62 183.566 331.451 182.944C336.951 182.597 347.751 182.241 355.451 182.154L369.451 181.996L365.951 178.99C361.706 175.344 339.162 160.914 336.998 160.457C336.147 160.278 324.201 165.062 310.451 171.089ZM208.951 187.714C192.726 194.646 164.875 206.513 147.061 214.084C115.277 227.594 114.648 227.916 113.474 231.332C108.277 246.45 92.6051 255.252 68.2211 256.748C60.0831 257.248 57.8891 257.703 57.4931 258.977C56.3771 262.561 51.2591 286.077 51.5951 286.077C51.7941 286.077 57.0071 283.152 63.1781 279.577C69.3501 276.002 74.9331 273.077 75.5861 273.077C76.2401 273.077 88.8511 281.087 103.612 290.876C118.374 300.665 131.003 309.01 131.677 309.42C132.639 310.005 132.848 302.887 132.648 276.53C132.444 249.753 132.664 242.504 133.728 240.985C134.463 239.936 135.462 239.077 135.947 239.077C136.433 239.077 161.045 228.582 190.64 215.754C220.236 202.926 247.489 191.159 251.201 189.604C254.913 188.049 257.951 186.412 257.951 185.966C257.951 184.952 241.335 175.071 239.67 175.094C239 175.104 225.176 180.783 208.951 187.714ZM96.0171 179.112C98.5321 180.458 98.4961 183.715 95.9511 185.077C91.6681 187.369 87.5201 181.592 91.7011 179.157C93.8971 177.878 93.7151 177.88 96.0171 179.112ZM70.5591 199.987C70.3871 200.312 67.8371 211.518 64.8911 224.889C58.7881 252.591 58.6291 251.45 68.4511 250.476C84.2421 248.91 95.7131 244.313 102.675 236.76C113.283 225.252 106.806 210.03 88.3651 203.131C82.5561 200.957 71.1151 198.937 70.5591 199.987ZM200.451 218.708C182.301 226.599 161.038 235.824 153.201 239.209L138.951 245.364L138.979 260.47L139.006 275.577L154.729 285.546C163.376 291.029 175.767 298.969 182.265 303.19L194.079 310.865L215.265 300.617C226.917 294.981 244.326 286.64 253.951 282.081C263.576 277.522 271.822 273.463 272.276 273.06C272.729 272.657 266.579 268.455 258.608 263.721L244.115 255.114L238.505 257.596C235.419 258.96 232.268 260.077 231.502 260.077C230.737 260.077 225.509 257.293 219.884 253.89L209.656 247.704L202.554 250.24L195.451 252.776L195.156 258.812C194.952 263.002 194.34 265.285 193.156 266.277C192.218 267.062 185.929 270.351 179.18 273.585C167.881 278.999 166.782 279.336 165.294 277.848C164.405 276.959 163.95 275.522 164.283 274.655C164.616 273.788 170.292 270.49 176.898 267.327L188.908 261.577L188.93 255.35C188.955 247.992 189.18 247.782 201.715 243.44C209.487 240.747 210.142 240.671 212.715 242.153C214.22 243.019 219.15 245.885 223.671 248.52L231.892 253.312L238.171 250.799C245.545 247.848 242.95 246.948 265.762 260.369L281.073 269.377L295.561 262.328C303.529 258.45 310.072 254.895 310.101 254.428C310.148 253.666 242.069 208.911 235.951 205.682C233.636 204.46 231.007 205.425 200.451 218.708ZM380.38 207.648C381.244 208.513 381.951 209.606 381.951 210.077C381.951 211.361 378.983 214.077 377.58 214.077C375.856 214.077 373.951 211.977 373.951 210.077C373.951 208.177 375.856 206.077 377.58 206.077C378.255 206.077 379.515 206.784 380.38 207.648ZM82.7881 221.955C83.5241 222.422 83.9741 223.877 83.7881 225.19C83.5221 227.078 82.8461 227.577 80.5601 227.577C76.9611 227.577 74.9891 224.941 76.8811 222.661C78.3231 220.923 80.7111 220.638 82.7881 221.955ZM233.751 227.277C236.938 230.464 232.988 235.238 228.951 233.077C225.545 231.254 227.024 226.077 230.951 226.077C231.831 226.077 233.091 226.617 233.751 227.277ZM320.831 230.853C322.164 233.343 320.395 236.077 317.451 236.077C316.131 236.077 314.616 235.301 314.085 234.353C312.71 231.896 314.509 229.077 317.451 229.077C318.787 229.077 320.308 229.876 320.831 230.853ZM390.451 256.789C366.801 268.008 333.276 283.875 315.951 292.049C282.24 307.953 240.123 327.925 190.951 351.323C174.176 359.305 142.226 374.504 119.951 385.099C97.6761 395.694 68.2011 409.729 54.4511 416.288C28.4931 428.67 24.3301 430.493 19.6701 431.519C16.4921 432.218 12.9601 437.253 12.9551 441.093C12.9451 447.963 20.2941 454.582 27.0151 453.756C28.9751 453.515 46.7501 445.552 66.5151 436.06C86.2801 426.569 109.426 415.541 117.951 411.554C126.476 407.567 153.026 394.967 176.951 383.554C200.876 372.141 230.576 357.974 242.951 352.07C255.326 346.167 278.951 334.934 295.451 327.109C335.578 308.078 356.05 298.359 382.951 285.567C395.326 279.683 411.301 272.15 418.451 268.827C433.063 262.036 437.28 259.275 439.452 255.075C442.317 249.535 440.397 240.89 435.615 237.793C433.616 236.498 430.168 237.948 390.451 256.789ZM284.021 248.661C284.971 249.806 285.046 250.707 284.291 251.911C282.812 254.271 278.826 254.626 277.296 252.534C274.414 248.593 280.875 244.871 284.021 248.661ZM168.761 253.894C168.338 257.552 163.661 258.272 161.885 254.954C160.852 253.023 160.994 252.46 162.911 250.909C165.968 248.433 169.201 250.083 168.761 253.894ZM113.451 265.577C113.451 268.219 113.106 268.577 110.56 268.577C106.923 268.577 104.991 265.939 106.923 263.61C107.702 262.672 109.381 262.104 110.865 262.276C113.005 262.525 113.451 263.095 113.451 265.577ZM444.997 273.038C443.648 274.058 434.088 278.872 423.753 283.735L404.962 292.577L404.957 311.827C404.953 322.414 405.184 331.077 405.469 331.077C405.754 331.077 410.545 328.79 416.115 325.995L426.242 320.913L425.637 311.699C424.867 299.975 425.367 297.871 428.832 298.273C431.435 298.575 431.453 298.637 431.737 308.32L432.023 318.063L440.237 313.954C444.755 311.694 448.471 309.784 448.496 309.711C448.521 309.637 448.296 300.939 447.996 290.381L447.451 271.184L444.997 273.038ZM238.451 277.577C238.451 279.998 237.979 280.644 236.007 280.922C232.81 281.373 230.616 278.572 232.057 275.879C232.762 274.562 233.93 274.055 235.768 274.267C238.014 274.526 238.451 275.066 238.451 277.577ZM61.9911 287.615L49.5311 294.95L44.2581 318.764C41.3581 331.861 38.9771 342.689 38.9681 342.827C38.9591 342.965 47.9141 343.077 58.8691 343.077H78.7861L105.359 330.827C119.974 324.09 131.924 318.352 131.916 318.077C131.897 317.468 75.6141 280.035 74.9331 280.179C74.6681 280.235 68.8441 283.581 61.9911 287.615ZM202.951 286.593C202.951 289.495 198.837 291.057 196.438 289.066C194.353 287.335 194.587 285.445 197.106 283.681C199.911 281.716 202.951 283.23 202.951 286.593ZM138.951 303.06V322.043L134.201 324.45C131.588 325.774 118.651 331.936 105.451 338.144L81.4511 349.432L59.5441 349.504L37.6371 349.577L33.3031 368.577C30.9201 379.027 29.0781 388.065 29.2101 388.662C29.3431 389.259 47.6871 380.934 69.9751 370.162C92.2631 359.39 127.464 342.477 148.198 332.577C168.933 322.677 185.91 314.278 185.925 313.912C185.952 313.217 140.69 284.077 139.584 284.077C139.236 284.077 138.951 292.619 138.951 303.06ZM326.911 295.529C328.362 297.277 327.468 300.665 325.34 301.481C323.367 302.238 319.951 300.42 319.951 298.613C319.951 296.855 322.676 294.077 324.4 294.077C325.118 294.077 326.248 294.73 326.911 295.529ZM368.451 309.888C352.501 317.456 328.063 329.029 314.144 335.607L288.837 347.566L289.144 368.071C289.341 381.259 289.808 388.419 290.451 388.135C291.001 387.892 315.639 375.748 345.201 361.149L398.951 334.606V327.841C398.951 324.121 398.535 321.077 398.026 321.077C397.518 321.077 380.98 328.99 361.276 338.662C313.018 362.35 313.192 362.27 311.2 361.886C310.108 361.676 309.451 360.638 309.451 359.123C309.451 356.921 313.569 354.655 353.951 334.637L398.451 312.577L398.741 304.327C398.901 299.789 398.676 296.089 398.241 296.103C397.807 296.117 384.401 302.321 368.451 309.888ZM73.7531 312.589L81.0021 317.1L88.3121 313.089C96.1851 308.768 99.3761 308.136 100.361 310.704C101.264 313.056 99.6811 314.51 91.2821 319.04C80.3761 324.922 80.5021 324.922 71.6321 319.132C67.3731 316.351 63.6271 313.396 63.3081 312.564C62.7531 311.119 64.4761 308.077 65.8491 308.077C66.2091 308.077 69.7651 310.107 73.7531 312.589ZM159.451 315.577C159.451 318.088 159.014 318.628 156.768 318.887C154.857 319.108 153.759 318.586 152.949 317.073C151.432 314.239 153.367 311.87 156.865 312.276C159.005 312.525 159.451 313.095 159.451 315.577ZM251.749 341.665C252.128 344.314 249.638 346.43 247.091 345.622C242.552 344.181 244.079 338.72 248.865 339.276C250.601 339.478 251.549 340.263 251.749 341.665ZM273.739 354.727L266.027 358.375L265.739 379.476C265.58 391.081 265.516 400.717 265.596 400.889C265.676 401.06 269.613 399.107 274.346 396.548L282.951 391.896V371.486C282.951 360.261 282.614 351.078 282.201 351.078C281.788 351.079 277.98 352.721 273.739 354.727ZM202.496 360.217C203.864 364.528 197.946 366.699 195.553 362.764C194.66 361.295 194.886 360.595 196.75 359.064C199.369 356.915 201.589 357.36 202.496 360.217ZM215.419 382.424C192.301 393.508 158.214 409.771 139.669 418.563L105.951 434.549V444.396C105.951 449.812 106.289 454.079 106.701 453.878C107.114 453.676 125.399 444.639 147.336 433.794C170.762 422.214 188.389 414.077 190.051 414.077C193.662 414.077 194.557 415.863 195.207 424.361C195.789 431.969 199.12 438.079 204.086 440.647C208.722 443.044 211.006 442.401 215.904 437.32C222.534 430.441 223.206 427.318 222.372 407.255C221.744 392.156 221.842 390.412 223.398 389.121C224.657 388.076 225.565 387.973 226.785 388.739C228.076 389.549 228.564 391.86 228.951 398.994L229.451 408.203L235.113 413.64C238.227 416.63 241.647 419.077 242.713 419.077C245.617 419.077 252.546 413.646 255.682 408.911L258.451 404.73L258.756 383.404C258.924 371.674 258.699 362.121 258.256 362.174C257.813 362.227 238.537 371.339 215.419 382.424ZM53.0171 364.112C55.5321 365.458 55.4961 368.715 52.9511 370.077C48.6681 372.369 44.5201 366.592 48.7011 364.157C50.8971 362.878 50.7151 362.88 53.0171 364.112ZM134.021 390.661C135.91 392.937 133.941 395.577 130.356 395.577C127.4 395.577 126.179 393.531 127.335 390.519C128.075 388.59 132.378 388.682 134.021 390.661ZM244.831 391.853C246.164 394.343 244.395 397.077 241.451 397.077C240.131 397.077 238.616 396.301 238.085 395.353C236.71 392.896 238.509 390.077 241.451 390.077C242.787 390.077 244.308 390.876 244.831 391.853ZM210.38 411.648C211.244 412.513 211.951 413.606 211.951 414.077C211.951 415.361 208.983 418.077 207.58 418.077C204.135 418.077 202.726 412.89 205.701 411.157C208.072 409.776 208.558 409.827 210.38 411.648ZM146.701 441.332L105.951 461.426V469.252C105.951 473.556 106.132 477.077 106.354 477.077C106.575 477.077 125.682 467.61 148.814 456.039C190.559 435.158 190.865 434.982 189.912 432.474C189.383 431.084 188.951 427.951 188.951 425.512C188.951 423.073 188.614 421.113 188.201 421.157C187.788 421.201 169.114 430.28 146.701 441.332ZM57.8771 427.939C59.1581 430.332 57.0531 433.439 54.4921 432.936C52.1211 432.47 50.4631 429.791 51.2601 427.713C52.1201 425.474 56.6411 425.628 57.8771 427.939ZM83.9511 445.103L69.4511 452.061L69.1811 473.659C69.0311 485.678 69.2991 495.106 69.7841 494.917C70.2641 494.73 77.2481 491.452 85.3041 487.633L99.9511 480.689V459.383C99.9511 447.665 99.6141 438.092 99.2011 438.111C98.7881 438.13 91.9261 441.276 83.9511 445.103ZM50.4511 461.265C31.5111 470.898 23.4771 472.783 14.7011 469.651L10.9511 468.313L10.9731 483.945C10.9981 501.586 12.0171 505.43 18.0021 510.467C26.8101 517.877 32.6081 515.215 34.4531 502.913C35.6271 495.083 33.4521 491.98 28.4021 494.281C26.3411 495.22 25.5801 495.135 24.2601 493.814C22.7701 492.324 22.7721 491.999 24.2891 489.684C26.6301 486.111 32.2741 485.185 35.7911 487.795C40.1151 491.005 41.0911 493.823 40.6501 501.827C40.4311 505.814 40.5211 509.044 40.8511 509.004C41.1811 508.965 46.1761 506.602 51.9511 503.754L62.4511 498.577L62.7211 477.327C62.9331 460.654 62.7171 456.088 61.7211 456.128C61.0221 456.156 55.9511 458.468 50.4511 461.265ZM85.3801 464.648C87.6441 466.913 87.3161 468.953 84.4811 470.245C82.5921 471.106 81.6501 471.072 80.4811 470.102C78.4321 468.402 78.5431 465.414 80.7011 464.157C83.0721 462.776 83.5581 462.827 85.3801 464.648ZM227.017 500.112C231.376 502.445 227.941 508.305 223.421 506.245C220.586 504.953 220.258 502.913 222.522 500.648C224.382 498.789 224.515 498.773 227.017 500.112Z"
        fill="#1B1919"
      />
    </svg>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className}>
      <path d="M19.598 18.5C18.7696 19.9349 16.9348 20.4265 15.4999 19.5981C14.065 18.7696 13.5734 16.9349 14.4018 15.5C15.2303 14.0651 17.065 13.5735 18.4999 14.4019C19.9348 15.2303 20.4264 17.0651 19.598 18.5Z" />
      <path d="M23.232 10.2058C22.6797 11.1623 21.4565 11.4901 20.4999 10.9378C19.5433 10.3855 19.2156 9.16235 19.7679 8.20576C20.3201 7.24918 21.5433 6.92143 22.4999 7.47371C23.4565 8.026 23.7842 9.24918 23.232 10.2058Z" />
      <path d="M19.7679 25.7944C19.2156 24.8378 19.5433 23.6146 20.4999 23.0623C21.4565 22.51 22.6797 22.8378 23.232 23.7944C23.7843 24.7509 23.4565 25.9741 22.4999 26.5264C21.5433 27.0787 20.3202 26.7509 19.7679 25.7944Z" />
      <path d="M25.9999 19.0001C24.8953 19.0001 23.9999 18.1047 23.9999 17.0001C23.9999 15.8956 24.8953 15.0001 25.9999 15.0001C27.1045 15.0001 27.9999 15.8956 27.9999 17.0001C27.9999 18.1047 27.1045 19.0001 25.9999 19.0001Z" />
      <path d="M14.232 25.7942C13.6797 26.7508 12.4565 27.0786 11.4999 26.5263C10.5433 25.974 10.2156 24.7508 10.7679 23.7942C11.3201 22.8376 12.5433 22.5099 13.4999 23.0622C14.4565 23.6145 14.7842 24.8376 14.232 25.7942Z" />
      <path d="M10.7679 10.2059C10.2157 9.24936 10.5434 8.02618 11.5 7.4739C12.4566 6.92161 13.6798 7.24936 14.232 8.20595C14.7843 9.16253 14.4566 10.3857 13.5 10.938C12.5434 11.4903 11.3202 11.1625 10.7679 10.2059Z" />
      <path d="M7.99999 19.0002C6.89542 19.0002 5.99999 18.1047 5.99999 17.0002C5.99999 15.8956 6.89542 15.0002 7.99999 15.0002C9.10456 15.0002 9.99999 15.8956 9.99999 17.0002C9.99999 18.1047 9.10456 19.0002 7.99999 19.0002Z" />
      <path d="M25.8659 3.64359C25.5898 4.12188 24.9782 4.28575 24.4999 4.00961C24.0216 3.73347 23.8577 3.12188 24.1339 2.64359C24.41 2.16529 25.0216 2.00142 25.4999 2.27756C25.9782 2.5537 26.1421 3.16529 25.8659 3.64359Z" />
      <path d="M33.0001 18.0002C32.4478 18.0002 32.0001 17.5524 32.0001 17.0002C32.0001 16.4479 32.4478 16.0002 33.0001 16.0002C33.5523 16.0002 34.0001 16.4479 34.0001 17.0002C34.0001 17.5524 33.5523 18.0002 33.0001 18.0002Z" />
      <path d="M31.3561 9.86594C30.8778 10.1421 30.2663 9.97821 29.9901 9.49992C29.714 9.02162 29.8778 8.41003 30.3561 8.13389C30.8344 7.85775 31.446 8.02162 31.7222 8.49992C31.9983 8.97821 31.8344 9.5898 31.3561 9.86594Z" />
      <path d="M30.3563 25.866C29.878 25.5899 29.7141 24.9783 29.9903 24.5C30.2664 24.0217 30.878 23.8578 31.3563 24.134C31.8346 24.4101 31.9985 25.0217 31.7223 25.5C31.4462 25.9783 30.8346 26.1422 30.3563 25.866Z" />
      <path d="M16.0001 33.0001C16.0001 32.4478 16.4478 32.0001 17.0001 32.0001C17.5524 32.0001 18.0001 32.4478 18.0001 33.0001C18.0001 33.5524 17.5524 34.0001 17.0001 34.0001C16.4478 34.0001 16.0001 33.5524 16.0001 33.0001Z" />
      <path d="M24.134 31.3566C23.8579 30.8783 24.0218 30.2667 24.5001 29.9905C24.9784 29.7144 25.59 29.8783 25.8661 30.3566C26.1422 30.8349 25.9784 31.4464 25.5001 31.7226C25.0218 31.9987 24.4102 31.8349 24.134 31.3566Z" />
      <path d="M9.86593 31.3564C9.58978 31.8347 8.97819 31.9986 8.4999 31.7224C8.02161 31.4463 7.85773 30.8347 8.13388 30.3564C8.41002 29.8781 9.02161 29.7142 9.4999 29.9904C9.97819 30.2665 10.1421 30.8781 9.86593 31.3564Z" />
      <path d="M1 18.0001C0.447715 18.0001 -3.44684e-08 17.5524 0 17.0001C3.44684e-08 16.4478 0.447715 16.0001 1 16.0001C1.55228 16.0001 2 16.4478 2 17.0001C2 17.5524 1.55228 18.0001 1 18.0001Z" />
      <path d="M3.64329 25.866C3.16499 26.1422 2.5534 25.9783 2.27726 25.5C2.00112 25.0217 2.16499 24.4101 2.64329 24.134C3.12158 23.8578 3.73317 24.0217 4.00931 24.5C4.28545 24.9783 4.12158 25.5899 3.64329 25.866Z" />
      <path d="M2.6435 9.86602C2.1652 9.58987 2.00133 8.97828 2.27747 8.49999C2.55361 8.0217 3.1652 7.85782 3.6435 8.13397C4.12179 8.41011 4.28566 9.0217 4.00952 9.49999C3.73338 9.97828 3.12179 10.1422 2.6435 9.86602Z" />
      <path d="M16.0001 1C16.0001 0.447715 16.4478 -4.87226e-08 17.0001 0C17.5524 4.87226e-08 18.0001 0.447715 18.0001 1C18.0001 1.55228 17.5524 2 17.0001 2C16.4478 2 16.0001 1.55228 16.0001 1Z" />
      <path d="M8.13398 3.64371C7.85783 3.16542 8.02171 2.55383 8.5 2.27768C8.97829 2.00154 9.58988 2.16542 9.86603 2.64371C10.1422 3.122 9.97829 3.73359 9.5 4.00973C9.02171 4.28588 8.41012 4.122 8.13398 3.64371Z" />
    </svg>
  )
}
