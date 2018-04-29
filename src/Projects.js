import {filters} from './filters.js';

export const projects = [
    {
        id: 1,
        title: 'Scavanger hunt',
        details: '',
        tags: [
            filters['team-size']['medium'],
            filters['amount']['free'],
            filters['location']['outdoors'],
            filters['cultural-values']['adventurous'],
            filters['type-of-activity']['active']
        ]
    },
    {
        id: 2,
        title: '"Thank you" envelopes',
        details: 'Setting up a wall with envelopes, where fellow birdies can put in appreciation notes to specific people',
        tags: [
            filters['team-size']['nan'],
            filters['amount']['free'],
            filters['location']['office'],
            filters['cultural-values']['empath'],
            filters['type-of-activity']['social'],
            filters['duration']['day'],
            filters['repeats']['no'],
        ]
    },
    {
        id: 3,
        title: 'Appreciation night',
        details: 'Organizing an evening with a team, where birdies get a chance to take a stage, and share what they appreciate in other fellow birdies, what they are grateful for this quarter, etc. All with pizza and beers!',
        tags: [
            filters['team-size']['nan'],
            filters['amount']['free'],
            filters['location']['office'],
            filters['cultural-values']['empath'],
            filters['type-of-activity']['social'],
            filters['duration']['evening'],
            filters['repeats']['no'],
        ]
    },
    {
        id: 4,
        title: 'Jump Birds',
        details: 'Organizing an outing with the team at Jumpsquare - a place where you can jump on huge trampolines and have fun, as a way to thank the team for their great work!',
        tags: [
            filters['team-size']['large'],
            filters['amount']['small'],
            filters['location']['indoors'],
            filters['cultural-values']['adventurous'],
            filters['type-of-activity']['active'],
            filters['duration']['evening'],
            filters['repeats']['no'],
        ]
    },
    {
        id: 5,
        title: 'Pub Quiz',
        details: 'Team event with own dicipline/travel industry/TravelBird related questions to keep your knowledge up to date in a fun way, while having some drinks and snacks. ',
        tags: [
            filters['team-size']['nan'],
            filters['amount']['free'],
            filters['location']['office'],
            filters['cultural-values']['genius'],
            filters['type-of-activity']['educational'],
            filters['duration']['evening'],
            filters['repeats']['no'],
        ]
    },
    {
        id: 6,
        title: 'Drink or food workshop',
        details: 'Get to know the taste from the regions we sell, so we can inspire others through our experiences. Can be self arranged with our birdies from another regions or arranged at a wine cellar for example. ',
        tags: [
            filters['team-size']['nan'],
            filters['amount']['small'],
            filters['location']['indoors'],
            filters['cultural-values']['lover'],
            filters['type-of-activity']['educational'],
            filters['duration']['evening'],
            filters['repeats']['no'],
        ]
    },
    {
        id: 7,
        title: 'Responsible boat ride',
        details: 'In the summer months when we take out the boat, lets take a couple of minutes to get plastic and such out of the water, whereafter we can join some drinks, music and each others company. ',
        tags: [
            filters['team-size']['nan'],
            filters['amount']['free'],
            filters['location']['outdoors'],
            filters['cultural-values']['owner'],
            filters['type-of-activity']['social'],
            filters['duration']['evening'],
            filters['repeats']['yearly'],
        ]
    },
]
