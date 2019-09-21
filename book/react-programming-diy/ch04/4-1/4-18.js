<div>
    {students && students.map()}
</div>
<div>
    {products.map()}
</div>
// 변수가 undefined, null이 될 가능성이 있다면, 인위적으로 조건을 적어야 함
// products가 빈 배열로 정의된 경우, 위처럼 간편하게 작성 가능