"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Phone, Mail, MapPin, Award, Briefcase, GraduationCap, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doctorData } from "@/lib/doctor-data"

export default function DoctorPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Add this to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Return a simple loader or nothing until client-side hydration is complete
  if (!isClient) {
    return <div className="min-h-screen bg-background"></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-slate-800"
            >
              Dr. {doctorData.name}
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {["about", "achievements", "experience", "booking"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-slate-600 hover:text-blue-600 transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-slate-100/50" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">Dr. {doctorData.name}</h1>
              <p className="text-xl text-slate-600 mb-4">{doctorData.specialization}</p>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">{doctorData.heroDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("booking")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${doctorData.whatsapp}`, "_blank")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Chat
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="./dr.png?height=400&width=400"
                    alt={`Dr. ${doctorData.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
                  <GraduationCap className="h-8 w-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Dr. {doctorData.name}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{doctorData.bio}</p>
          </motion.div>

          {/* Education Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Educational Journey</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
              {doctorData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-8 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{edu.degree}</CardTitle>
                        <CardDescription>{edu.institution}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{edu.year}</p>
                        {edu.details && <p className="text-sm mt-2">{edu.details}</p>}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Achievements & Recognition</h2>
            <p className="text-xl text-slate-600">Celebrating excellence in medical practice and research</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.year}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{achievement.description}</p>
                    {achievement.organization && (
                      <Badge variant="secondary" className="mt-3">
                        {achievement.organization}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Professional Experience</h2>
            <p className="text-xl text-slate-600">A journey of dedicated medical service</p>
          </motion.div>

          {/* Current Position Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="border-2 border-blue-200 bg-blue-50/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-blue-800">Currently Working At</CardTitle>
                      <CardDescription className="text-blue-600">Present Position</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">{doctorData.currentPosition.title}</h3>
                <p className="text-lg text-slate-600 mb-2">{doctorData.currentPosition.hospital}</p>
                <p className="text-slate-500 mb-4">{doctorData.currentPosition.location}</p>
                <p className="text-slate-700">{doctorData.currentPosition.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 w-1 h-full bg-slate-200"></div>
              {doctorData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-8 pl-16"
                >
                  <div className="absolute left-6 w-4 h-4 bg-slate-400 rounded-full border-4 border-white shadow-lg"></div>
                  <Card className="flex-1 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{exp.position}</CardTitle>
                          <CardDescription className="text-base">{exp.hospital}</CardDescription>
                        </div>
                        <Badge variant="outline">{exp.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-2">{exp.location}</p>
                      <p className="text-slate-700">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Book an Appointment</h2>
            <p className="text-xl text-slate-600">Schedule your consultation with Dr. {doctorData.name}</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Appointment Request</CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Patients Say</h2>
            <p className="text-xl text-slate-600">Testimonials from those we've had the privilege to serve</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.condition}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{testimonial.feedback}"</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 text-yellow-400">
                          ★
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Dr. {doctorData.name}</h3>
              <p className="text-slate-300 mb-4">{doctorData.specialization}</p>
              <p className="text-slate-400">{doctorData.footerDescription}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-slate-300">{doctorData.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-slate-300">{doctorData.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-slate-300">{doctorData.contact.address}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  onClick={() => scrollToSection("booking")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  onClick={() => window.open(`https://wa.me/${doctorData.whatsapp}`, "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Chat
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Dr. {doctorData.name}. All rights reserved. | Designed with care for better healthcare.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 shadow-2xl"
          onClick={() => window.open(`https://wa.me/${doctorData.whatsapp}`, "_blank")}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  )
}

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    symptoms: "",
    type: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Booking request:", formData)
    alert("Thank you for your appointment request! We will contact you within 24 hours to confirm your appointment.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      symptoms: "",
      type: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="mt-1"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <Label htmlFor="type">Appointment Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">General Consultation</SelectItem>
              <SelectItem value="followup">Follow-up Visit</SelectItem>
              <SelectItem value="emergency">Emergency Consultation</SelectItem>
              <SelectItem value="second-opinion">Second Opinion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Preferred Date *</Label>
          <Input
            id="date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="mt-1"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label htmlFor="time">Preferred Time *</Label>
          <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select preferred time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="symptoms">Symptoms or Reason for Visit</Label>
        <Textarea
          id="symptoms"
          value={formData.symptoms}
          onChange={(e) => handleChange("symptoms", e.target.value)}
          className="mt-1"
          placeholder="Please describe your symptoms or reason for the appointment"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
        <Calendar className="mr-2 h-5 w-5" />
        Request Appointment
      </Button>

      <p className="text-sm text-slate-500 text-center">
        * Required fields. We'll contact you within 24 hours to confirm your appointment.
      </p>
    </form>
  )
}
