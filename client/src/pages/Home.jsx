import React from 'react'

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-10">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                🌟 Welcome to HandApp! 🌟
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <p className="text-lg text-gray-600 text-center">
                    Your hand gesture recognition application is ready to go!
                </p>
            </div>
        </div>
    )
}

export default Home