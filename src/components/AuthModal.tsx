'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Chrome, ArrowRight, Github } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onModeChange: (mode: 'signin' | 'signup') => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)  // Separate loading state for Google
  const [githubLoading, setGithubLoading] = useState(false)  // Separate loading state for GitHub
  const [error, setError] = useState('')

  const { signIn, signUp, signInWithGoogle, signInWithGitHub } = useAuth()

  // Reset loading states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLoading(false)
      setGoogleLoading(false)
      setGithubLoading(false)
      setError('')
      setEmail('')
      setPassword('')
      setFullName('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (mode === 'signin') {
        result = await signIn(email, password)
      } else {
        result = await signUp(email, password, fullName)
      }

      if (result.error) {
        setError(result.error.message)
      } else {
        if (mode === 'signup') {
          // Show success message for signup
          setError('')
          alert('Success! Please check your email for a confirmation link. You may need to check your spam folder.')
          onClose()
        } else {
          onClose()
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')
    
    // Set a shorter timeout to stop the spinning animation
    const spinnerTimeoutId = setTimeout(() => {
      setGoogleLoading(false)
    }, 3000) // Stop spinner after 3 seconds
    
    // Set a longer timeout for error handling
    const errorTimeoutId = setTimeout(() => {
      setError('Sign-in is taking longer than expected. Please check if a popup was blocked.')
    }, 10000) // Show error after 10 seconds
    
    try {
      const result = await signInWithGoogle()
      
      if (result.error) {
        clearTimeout(spinnerTimeoutId)
        clearTimeout(errorTimeoutId)
        setError(result.error.message)
        setGoogleLoading(false)
      } else {
        // If successful, the user will be redirected
        console.log('OAuth initiated successfully')
        // Don't clear timeouts here, let them handle the UI
      }
    } catch (err: any) {
      clearTimeout(spinnerTimeoutId)
      clearTimeout(errorTimeoutId)
      setError(err.message || 'An error occurred during sign-in')
      setGoogleLoading(false)
    }
  }

  const handleGitHubSignIn = async () => {
    setGithubLoading(true)
    setError('')
    
    // Set a shorter timeout to stop the spinning animation
    const spinnerTimeoutId = setTimeout(() => {
      setGithubLoading(false)
    }, 3000) // Stop spinner after 3 seconds
    
    // Set a longer timeout for error handling
    const errorTimeoutId = setTimeout(() => {
      setError('GitHub sign-in is taking longer than expected. Please check if a popup was blocked.')
    }, 10000) // Show error after 10 seconds
    
    try {
      const result = await signInWithGitHub()
      
      if (result.error) {
        clearTimeout(spinnerTimeoutId)
        clearTimeout(errorTimeoutId)
        setError(result.error.message)
        setGithubLoading(false)
      } else {
        // If successful, the user will be redirected
        console.log('GitHub OAuth initiated successfully')
        // Don't clear timeouts here, let them handle the UI
      }
    } catch (err: any) {
      clearTimeout(spinnerTimeoutId)
      clearTimeout(errorTimeoutId)
      setError(err.message || 'An error occurred during GitHub sign-in')
      setGithubLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-background border border-border rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {mode === 'signin' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-muted-foreground">
                {mode === 'signin' 
                  ? 'Continue your AI conversations' 
                  : 'Start your AI journey today'
                }
              </p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 border border-gray-300 rounded-lg py-3 px-4 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {googleLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Chrome className="w-5 h-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* GitHub Sign In */}
            <button
              onClick={handleGitHubSignIn}
              disabled={githubLoading || loading}
              className="w-full flex items-center justify-center space-x-3 bg-gray-900 text-white border border-gray-700 rounded-lg py-3 px-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {githubLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">or</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {', '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                {', and '}
                <Link href="/refund" className="text-primary hover:underline">
                  Refund Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
