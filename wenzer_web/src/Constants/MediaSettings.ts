export enum BreakPoints {
    xsmall = 300,
    small = 500,
    medium = 1024,
    large = 1200,
    XLarge = 1400
}

export enum screens { 
    Feed,
    HotProjects,
    MyProjects,
    Profile,
    Search
}

export enum searchTypes { 
    People,
    Project,
    Post
}

export const MediaQueries = {
    XSMALL: `only screen and (max-width: ${BreakPoints.xsmall}px)`,
    SMALL: `only screen and (min-width: ${BreakPoints.xsmall}px) and (max-width: ${BreakPoints.small}px)`,
    MEDIUM: `only screen and (min-width: ${BreakPoints.small}px) and (max-width: ${BreakPoints.medium}px)`,
    LARGE: `only screen and (min-width: ${BreakPoints.medium}px) and (max-width: ${BreakPoints.large}px)`,
    XLARGE: `only screen and (min-width: ${BreakPoints.large}px)`,
    LAYMODE: `only screen and (max-width: ${BreakPoints.large}px) and (max-height: ${BreakPoints.small}px)`
};
