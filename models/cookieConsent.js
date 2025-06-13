const mongoose = require('mongoose');

const cookieConsentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    consentData: {
        necessary: {
            type: Boolean,
            default: true
        },
        functional: {
            type: Boolean,
            default: false
        },
        analytics: {
            type: Boolean,
            default: false
        },
        marketing: {
            type: Boolean,
            default: false
        }
    },
    consentVersion: {
        type: String,
        default: '1.0'
    },
    consentTimestamp: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 days
    },
    source: {
        type: String,
        enum: ['banner', 'settings', 'api'],
        default: 'banner'
    },
    country: {
        type: String,
        default: 'Unknown'
    }
}, {
    timestamps: true,
    collection: 'cookieConsents'
});

// Index for efficient queries
cookieConsentSchema.index({ consentTimestamp: -1 });
cookieConsentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to get consent statistics
cookieConsentSchema.statics.getConsentStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalConsents: { $sum: 1 },
                functionalAccepted: {
                    $sum: { $cond: [{ $eq: ['$consentData.functional', true] }, 1, 0] }
                },
                analyticsAccepted: {
                    $sum: { $cond: [{ $eq: ['$consentData.analytics', true] }, 1, 0] }
                },
                marketingAccepted: {
                    $sum: { $cond: [{ $eq: ['$consentData.marketing', true] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalConsents: 1,
                functionalRate: {
                    $multiply: [{ $divide: ['$functionalAccepted', '$totalConsents'] }, 100]
                },
                analyticsRate: {
                    $multiply: [{ $divide: ['$analyticsAccepted', '$totalConsents'] }, 100]
                },
                marketingRate: {
                    $multiply: [{ $divide: ['$marketingAccepted', '$totalConsents'] }, 100]
                }
            }
        }
    ]);
    
    return stats[0] || {
        totalConsents: 0,
        functionalRate: 0,
        analyticsRate: 0,
        marketingRate: 0
    };
};

module.exports = mongoose.model('CookieConsent', cookieConsentSchema); 