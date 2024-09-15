export interface AnnouncementProps {
    title: string;
    writer: string;
    is_updated: boolean;
    views: number;
    created: string;
    main_text: string;
    file_name?: string;
    file?: string;
    fileContentType?: string;
}

export interface ExistingFileProps {
    name: string;
    content: string;
    contentType: string;
}

export interface ImageProps {
    _id: string;
    url: string;
}

export interface SubsidiaryProps {
    _id: string;
    name: string;
    explain: string;
}

export interface SubsidiaryListProps {
    subsidiaries: SubsidiaryProps[];
}

export interface AnnouncementForListProps {
    _id: string;
    created: string;
    title: string;
    writer: string;
    category: string;
    views: number;
}