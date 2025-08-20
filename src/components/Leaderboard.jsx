import React, { useEffect, useState } from "react";
import { TrophyIcon, HandThumbUpIcon, HandThumbDownIcon, StarIcon } from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/outline";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://projectideagen-backend.onrender.com/leaderboard")
        .then((res) => res.json())
        .then((data) => {
            setLeaders(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching leaderboard:", err);
            setIsLoading(false);
        });
    }, []);

    const getRankIcon = (rank) => {
        if (rank === 1) return <TrophyIcon className="h-6 w-6 text-yellow-500" />;
        if (rank === 2) return <TrophyIcon className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <TrophyIcon className="h-6 w-6 text-amber-600" />;
        return <span className="h-6 w-6 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold">#{rank}</span>;
    };

    const getRankStyle = (rank) => {
        if (rank === 1) return "ring-2 ring-yellow-500/30 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20";
        if (rank === 2) return "ring-2 ring-gray-400/30 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50";
        if (rank === 3) return "ring-2 ring-amber-600/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20";
        return "bg-white dark:bg-slate-800";
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty?.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Web app': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            'Hardware': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            'AI': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
            'Mobile App': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
            'Game': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400">Loading leaderboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12 mt-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <TrophyIcon className="h-8 w-8 text-yellow-500" />
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Project Leaderboard
                    </h1>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    The most popular project ideas ranked by community votes. See what's trending!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <ChartBarIcon className="h-8 w-8 text-teal-500" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Projects</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{leaders.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <HandThumbUpIcon className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Upvotes</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {leaders.reduce((sum, item) => sum + item.upvotes, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <StarIcon className="h-8 w-8 text-yellow-500" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Top Score</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {leaders.length > 0 ? leaders[0]?.net_score || 0 : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="max-w-4xl mx-auto">
                {leaders.length === 0 ? (
                    <div className="text-center py-12">
                        <TrophyIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-xl text-slate-600 dark:text-slate-400">No projects ranked yet!</p>
                        <p className="text-slate-500 dark:text-slate-500 mt-2">Be the first to vote on some projects.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {leaders.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`${getRankStyle(item.rank)} rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    {/* Rank and Title */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="flex-shrink-0">
                                            {getRankIcon(item.rank)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                                            {item.category}
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(item.difficulty)}`}>
                                            {item.difficulty}
                                        </span>
                                    </div>

                                    {/* Score and Votes */}
                                    <div className="flex items-center gap-4 lg:flex-shrink-0">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {item.net_score}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Net Score</p>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                <HandThumbUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                                    {item.upvotes}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                                <HandThumbDownIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                                    {item.downvotes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Vote Ratio */}
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                                {Math.round(item.vote_ratio * 100)}%
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Approval</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar for Vote Ratio */}
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${item.vote_ratio * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}