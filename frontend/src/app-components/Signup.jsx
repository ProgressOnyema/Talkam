import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const passwordRequirements = {
    minLength: (password) => password.length >= 8,
    hasUppercase: (password) => /[A-Z]/.test(password),
    hasLowercase: (password) => /[a-z]/.test(password),
    hasNumber: (password) => /[0-9]/.test(password),
    hasSpecialChar: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const getPasswordValidation = (password) => {
    return {
      minLength: passwordRequirements.minLength(password),
      hasUppercase: passwordRequirements.hasUppercase(password),
      hasLowercase: passwordRequirements.hasLowercase(password),
      hasNumber: passwordRequirements.hasNumber(password),
      hasSpecialChar: passwordRequirements.hasSpecialChar(password),
    };
  };

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
    } else {
      const validation = getPasswordValidation(formData.password);
      if (!Object.values(validation).every(Boolean)) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        toast.success('Account created successfully!');
        navigate('/login');
      } catch (error) {
        toast.error(error.message || 'Failed to create account');
        console.error('Signup error:', error);
      }
    } else {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form.');
    }
  };

  const passwordValidation = getPasswordValidation(formData.password);

  const isFormValid = () => {
    return (
      formData.username.trim() !== '' &&
      formData.password !== '' &&
      Object.values(getPasswordValidation(formData.password)).every(Boolean) &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="my-10 min-h-screen bg-background">
      <Card className="w-[400px] border-none shadow-none">
        <CardHeader>
          <h2 className="text-3xl font-bold text-left">Sign Up</h2>
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
                className={errors.username ? "border-destructive py-5" : "py-5"}
                placeholder="Do not use your real name"
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
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
                  className={errors.password ? "border-destructive py-5 pr-10" : "py-5 pr-10"}
                  placeholder="At least 8 characters"
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
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  {passwordValidation.minLength ? (
                    <span className="text-green-500">👍</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasUppercase ? (
                    <span className="text-green-500">👍</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                  <span>Contains uppercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasLowercase ? (
                    <span className="text-green-500">👍</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                  <span>Contains lowercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasNumber ? (
                    <span className="text-green-500">👍</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                  <span>Contains number</span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasSpecialChar ? (
                    <span className="text-green-500">👍</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                  <span>Contains special character</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              By clicking Sign Up, you are agreeing to the{" "}
              <a href="/terms" className="link-color">
                Terms of Use
              </a>{" "}
              including the arbitration clause and you are acknowledging the{" "}
              <a href="/privacy" className="link-color">
                Privacy Policy
              </a>
            </p>

            <Button 
              type="submit" 
              className="w-full text-xl py-6"
              variant={isFormValid() ? "default" : "secondary"}
              disabled={!isFormValid()}
            >
              Sign Up
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="link-color">
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
