import "./globals.css";

export default function Icon(props: any) {

    return (
        <picture>
            <source srcSet={props.file} media="(prefers-color-scheme: dark)" />
            <img src={props.file} alt="" />
        </picture>
    )

}