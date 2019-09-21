function Modal({ title, desc}) {
    const domNode = document.getElementById('modal');
    return ReactDOM.createPortal(
        <div>
            <p>{title}</p>
            <p>{desc}</p>
        </div>
    )
}