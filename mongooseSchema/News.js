const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        headline: {
            type: String
        },
        gnewsTitle: {
            type: String
        },
        fullContent: {
            type: String
        },
        summary: {
            type: String
        },
        points: {
            type: String
        },
        tweet: {
            type: String
        },
        tags: {
            type: String
        },
        bullets: {
            type: String
        },
        modelId: {
            type: String
        },
        modelStatus: {
            type: String
        },
        company: {
            type: String
        },
        newsLink: {
            type: String
            // required: true
        },
        title: {
            type: String
            // required: true
        },
        image: {
            type: String,
            default: ""
            // required: true
        },
        s3ImgUrl: {
            type: String,
            default: ""
        },
        imgixUrlLowRes: {
            type: String,
            default: ""
        },
        imgixUrlHighRes: {
            type: String,
            default: ""
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
        publishTime: {
            type: Date,
            required: true,
            default: Date.now
        },
        source: {
            type: String
        },
        author: {
            type: String
        },
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor"
        },
        language: {
            type: Schema.Types.ObjectId,
            ref: "Language"
        },
        // sampleQnA: {
        //     type: Array,
        // },
        status: {
            type: String,
            default: "pending",
            enum: [
                "pending",
                "processed",
                "goneToGPT",
                "gptError",
                "gptSuccess",
                "s3Error",
                "ready",
                "readyForReview",
                "published",
                "rejected",
                "blocked",
                "repeated",
                "repeated-pinecone",
                "repeated-title-pinecone",
                "horoscope",
                "ads",
                "ad",
                "other",
                "noImage",
                "reported",
                "errorFromFullContentGeneration",
                "ytPending",
                "rejectedImage",
                "awaitingImageApproval",
                "errorFromGPT",
                "longHeadline",
                "ad-detected",
                "gptFineTuneLogsAd",
                "shortSummary",
                "brandImage",
                "imageEmbeddingError",
                "combinationNews"
            ]
        },
        shareLink: {
            type: String
        },
        gptContent: {
            type: String
        },
        gptLogs: {
            type: Object
        },
        gptLogsSummarization: {
            type: Object
        },
        gptLogsClassification: {
            type: Object
        },
        sentiment: {
            type: String,
            enum: ["Positive", "Negative", "Neutral"]
        },
        advancedSentiment: {
            type: String,
            default: "Default"
        },
        reviewed: {
            type: Boolean,
            default: false
        },
        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        rejectReason: {
            type: String
        },
        imageEnhanced: {
            type: Boolean
        },
        imageEnhancedBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        imageEnhancedUrl: {
            type: String
        },
        imageEnhanceds3Url: {
            type: String
        },
        imageEnhancedApproved: {
            type: Boolean
        },
        poll: {
            type: Schema.Types.ObjectId,
            ref: "Poll"
        },
        pollEnabledOrDisabledBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        duration: {
            type: String
            // required: true
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "YoutubeChannel"
            // required: true
        },
        mediaId: {
            type: String
        },
        transcript: {
            type: String
        },
        insightData: {
            type: Object
        },
        gptLogsFullContent: {
            type: Object
        },
        isVideo: {
            type: Boolean
        },
        youtubeVideoLink: {
            type: String
        },
        transcriptBy: {
            type: String,
            enum: ["npm", "speakai"]
        },
        ghostStatus: {
            type: String,
            eunm: ["publsihed"]
        },
        isRSS: {
            type: Boolean
        },
        imageSemiblur: {
            type: Boolean
        },
        roboflowResponse: {
            type: Object
        },
        audio: {
            type: Boolean,
            default: false
        },
        titleAudioUrl: {
            type: String
        },
        contentWithTitleAudioUrl: {
            type: String
        },
        replicateId: {
            type: String
        },
        imageEnhancedByReplicate: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('News', schema)
