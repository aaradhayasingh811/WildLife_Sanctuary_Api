import Alert from "../models/alert.model.js";

// Report an alert
export const reportAlert = async (req, res) => {
    try {
        const alertData = req.body;
        const newAlert = new Alert(alertData);
        await newAlert.save();
        res.status(201).json({ message: "Alert reported successfully", alert: newAlert });
    } catch (error) {
        res.status(500).json({ message: "Error reporting alert", error: error.message });
    }
};

// Get all alerts
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching alerts", error: error.message });
    }
};

// Resolve an alert
export const resolveAlert = async (req, res) => {
    try {
        const { id } = req.params;
        const { resolvedBy } = req.body;

        const updatedAlert = await Alert.findByIdAndUpdate(
            id,
            { status: "Resolved", resolvedBy },
            { new: true }
        );

        if (!updatedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert resolved successfully", alert: updatedAlert });
    } catch (error) {
        res.status(500).json({ message: "Error resolving alert", error: error.message });
    }
};

// AI Risk Detection (Placeholder for AI integration)
export const aiRiskDetection = async (req, res) => {
    try {
        // Mock AI analysis - Replace with actual AI logic
        res.status(200).json({ message: "AI Risk Detection Placeholder", risk: "Medium" });
    } catch (error) {
        res.status(500).json({ message: "Error processing AI risk detection", error: error.message });
    }
};

// Panic Button Trigger
export const panicButtonTrigger = async (req, res) => {
    try {
        const alertData = {
            alertId: `PANIC-${Date.now()}`,
            alertType: "Emergency",
            description: "Panic button pressed!",
            location: req.body.location || [0, 0], // Default location if not provided
            status: "Active",
            severity: "High",
            reportedBy: req.body.reportedBy || "Unknown",
        };

        const newAlert = new Alert(alertData);
        await newAlert.save();

        res.status(201).json({ message: "Panic alert triggered!", alert: newAlert });
    } catch (error) {
        res.status(500).json({ message: "Error triggering panic button", error: error.message });
    }
};
