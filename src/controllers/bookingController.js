const Booking = require('../models/Booking');  // Ensure this model is properly defined

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { serviceId, userId, date } = req.body;
        if (!serviceId || !userId || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new booking
        const newBooking = new Booking({
            serviceId,
            userId,
            date,
            status: 'pending',  // Default status (could be 'pending', 'confirmed', etc.)
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.bookingId,
            { status: req.body.status },
            { new: true }  // Returns the updated booking
        );
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
};

// Get all bookings for a user
const getBookingsForUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
    }
};

// Get all bookings for a service provider
const getBookingsForServiceProvider = async (req, res) => {
    try {
        const bookings = await Booking.find({ serviceId: req.params.providerId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching provider bookings:', error);
        res.status(500).json({ message: 'Error fetching provider bookings', error: error.message });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({ message: 'Error fetching all bookings', error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    updateBookingStatus,
    getBookingsForUser,
    getBookingsForServiceProvider,
    getAllBookings
};
