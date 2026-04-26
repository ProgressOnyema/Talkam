import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://172.20.10.6:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Invalid credentials');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!');
        navigate('/chatbot');
      } catch (error) {
        setErrors({
          ...errors,
          submit: error.message || 'Invalid username or password'
        });
        console.error('Login error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const isFormValid = () => {
    return (
      formData.username.trim() !== '' &&
      formData.password !== '' &&
      Object.keys(errors).length === 0
    );
  };
  return (
    <div className="my-10 min-h-screen bg-background">
      <Card className="w-[400px] border-none shadow-none">
        <CardHeader>
          <h2 className="text-3xl font-bold text-left">Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`py-5 ${errors.submit ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your username"
              />
              {errors.submit && (
                <p className="text-xs text-red-500">{errors.submit}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`py-5 pr-10 ${errors.submit ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.submit && (
                <p className="text-xs text-red-500">{errors.submit}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full text-xl py-6"
              variant={isFormValid() ? "default" : "secondary"}
              disabled={!isFormValid()}
            >
              Login
            </Button>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="link-color">
                Sign Up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
