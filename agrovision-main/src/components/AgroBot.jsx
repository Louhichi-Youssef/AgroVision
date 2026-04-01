import React from 'react'
import Spline from '@splinetool/react-spline'

const AgroBot = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/*3D Robot */}
      <Spline
        className="absolute top-0 right-[-20%] w-[20%] h-[40%] z-0 origin-top-right scale-75"
        scene="https://prod.spline.design/hVGVRMoBFjvVfPV3/scene.splinecode"
      />

    </div>
  )
}

export default AgroBot